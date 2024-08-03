import { Router } from "express";
import Joi from "joi";
import pool from "../config/pgConfig.cjs";
import {
  mySignInFunc,
  checkMyAuthStatus,
  signMeOut,
  myGoogleSignIn,
  mySignUpFunc,
  resetMyPass,
  getSession,
  isAdmin,
} from "../controllers/Auth.js";

const authRouter = Router();
authRouter.post("/checkDets", (req, res, next) => {
  const schema = Joi.object({
    uid: Joi.string().guid(),
    FirstName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[A-Za-z]+$/)
      .required(),
    LastName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[A-Za-z]+$/)
      .required(),
    Email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    Gender: Joi.string().valid("male", "female").required(),
    Age: Joi.number().integer().min(20).max(99).required(),
    Organisation: Joi.string().required().min(3),
    start: Joi.date().required(),
    end: Joi.date().less("2099-12-31").required(),
    JobTitle: Joi.string().required().min(3),
    Phone: Joi.string()
      .pattern(/\b\d{10,12}\b/)
      .required(),
    Address: Joi.string().min(5).max(40).required(),
    ProfilePic: Joi.string().dataUri().required(),
  }).options({ abortEarly: false });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.json(error);
  } else {
    // If validation succeeds, process the data
    // Here you can save the data to the database or perform any other operations
    res.json({ message: "Form submitted successfully", data: value });
  }
});

authRouter.get("/isAdmin", async (req, res, next) => {
  try {
    const resp = await isAdmin();
    console.log(resp);
    if (resp.error) {
      return res.status(400).json("error");
    }
    if (resp.data) return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

authRouter.post("/checkEmail", async (req, res, next) => {
  try {
    const { email } = req.body;
    const schema = Joi.object({
      Email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    });
    const { error, value } = schema.validate({ Email: email });
    if (error) {
      return res
        .status(400)
        .json({ error: "Email address is missing in the request body." });
    }
    const query = "SELECT auth.is_email_exist($1);";
    const result = await pool.query(query, [email]);
    const isEmailExist = result.rows[0].is_email_exist;
    res.json({ isEmailExist });
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: err.message });
  }
});

authRouter.get("/authStatus", async (req, res, next) => {
  let token;
  if (req.headers["client-type"] === "react-native") {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7, authHeader.length);
    }
  } else {
    if (req.signedCookies && req.signedCookies["access"]) {
      token = req.signedCookies["access"];
    }
  }
  if (!token) {
    return res.status(400).json({ error: "Authorization token is required" });
  }
  try {
    const isAuthenticated = await checkMyAuthStatus(token);
    if (isAuthenticated.status) {
      res.status(200).json({
        message: "User is authenticated",
        loginStatus: isAuthenticated.status,
        adminStatus: isAuthenticated.adminStat,
      });
    } else {
      res.status(401).json({ message: "User is not authenticated" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
  }
});

authRouter.post("/signUp", async (req, res, next) => {
  try {
    const { mail, pass, tok } = req.body;
    const response = await mySignUpFunc(mail, pass, tok);
    if (response.error) res.status(404).json({ error: response.error });
    else res.status(200).json({ data: response.data });
  } catch (err) {
    res.status(500).send("Internal server error");
    console.log(err);
  }
});

authRouter.get("/googleSign", async (req, res, next) => {
  try {
    const response = await myGoogleSignIn();
    console.log("response is", response);
    if (response.error) res.status(404).json({ error: response.error });
    else res.status(200).json(response.data);
  } catch (err) {
    res.status(500).send("Internal server error");
    console.log(err);
  }
});

authRouter.get(
  "/callback",
  async (req, res) => {
    const response = await getSession(req.query);
    console.log("callback response is", response);
    if (response.error) {
      return res.status(400).json({ error: response.error.message });
    }
    res
      .cookie("access", response.access_token, {
        httpOnly: true, // Ensures the cookie is only accessible via HTTP(S), not JavaScript
        secure: true, // Ensures the cookie is only sent over HTTPS
        maxAge: sess.expires_in * 1000, // Sets the cookie expiration time
        sameSite: "lax",
        partitioned: true,
        signed: true,
      })
      .status(200)
      .redirect(`${process.env.FRONTEND_DOMAIN}/User/Home`);
  }
  // Set the token in a cookie
);

authRouter.post("/signIn", async (req, res, next) => {
  const { mail, pass, tok } = req.body;
  const result = await mySignInFunc(mail, pass, tok);
  const sess = await result.data.session;
  const clientType = req.headers["client-type"];
  if (result.error) {
    res.status(400).json({ error: result.error });
  } else {
    if (clientType === "react-native") {
      res.status(200).json({
        access_token: sess.access_token,
        refresh_token: sess.refresh_token,
        expires_in: sess.expires_in,
      });
    } else {
      res
        .cookie("access", sess.access_token, {
          httpOnly: true, // Ensures the cookie is only accessible via HTTP(S), not JavaScript
          secure: true, // Ensures the cookie is only sent over HTTPS
          maxAge: sess.expires_in * 1000, // Sets the cookie expiration time
          sameSite: "lax",
          partitioned: true,
          signed: true,
        })
        .status(200)
        .json({ data: result.data });
    }
  }
});

authRouter.get("/signOut", async (req, res, next) => {
  try {
    const clientType = req.headers["client-type"];
    const response = await signMeOut();
    if (clientType === "react-native") {
      // For React Native clients, just return the status
      if (response) {
        res.status(200).send(true);
      } else {
        res.status(404).send(false);
      }
    } else {
      // For other clients, clear the cookie
      if (response) {
        res.clearCookie("access", {
          httpOnly: true,
          secure: true,
          sameSite: "lax",
          signed: true,
          path: "/",
        });
        res.status(200).send(true);
      } else {
        res.status(404).send(false);
      }
    }
  } catch (err) {
    console.error("Error signing out:", err);
    res.status(500).send("Internal server error");
  }
});

authRouter.post("/resetPass", async (req, res, next) => {
  const { mail, tok } = req.body;
  const response = await resetMyPass(mail, tok);
  if (response.error) res.status(404).send("Password cannot be reset");
  else res.status(200).json(response.data);
});

export default authRouter;
