import { Router } from "express";
import {
  emailValid,
  otpValid,
  userDetValid,
} from "../controllers/Validator.js";
import pool from "../config/pgConfig.cjs";
import { validateUserData } from "../controllers/Validator.js";
import {
  mySignInFunc,
  checkMyAuthStatus,
  signMeOut,
  myGoogleSignIn,
  mySignUpFunc,
  resetMyPass,
  getSession,
  isAdmin,
  mfaEnroll,
  mfaVerify,
} from "../controllers/Auth.js";

const authRouter = Router();

authRouter.post("/checkDets", (req, res, next) => {
  const { error, value } = validateUserData(req.body);
  if (error) {
    res.json(error);
  } else {
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
    const { error } = emailValid({ email });
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
    const { error } = userDetValid(req.body);
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ status: false, data: errorMessages });
    }
    const response = await mySignUpFunc(mail, pass, tok);
    if (response.error)
      return res.status(404).json({ status: false, error: response.error });
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

authRouter.get("/callback", async (req, res) => {
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
});

authRouter.post("/signIn", async (req, res, next) => {
  const { mail, pass, tok } = req.body;
  const { error } = userDetValid({ mail, pass, tok });
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ status: false, data: errorMessages });
  }
  const result = await mySignInFunc(mail, pass, tok);
  if (result.error || !!result.data.user.email_confirmed_at === false) {
    return res
      .status(402)
      .json({ status: false, message: "Please Confirm your email" });
  }
  if (result.error || !result.data.session) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid email or password." });
  }
  // if (result.error || !result.data.user.app_metadata.mfaStatus?.mStat) {
  //   return res.status(403).json({ status: false, message: "MFA not enabled" });
  // }
  const sess = result.data.session;
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
        .json({
          status: true,
          data: result.data,
          emailConfirmed: !!result.data.user.email_confirmed_at,
          mfaStatus: !!result.data.user.app_metadata.mfaEnabled,
        });
    }
  }
});

authRouter.get("/mfaEnroll", async (req, res, next) => {
  try {
    const resp = await mfaEnroll();
    if (resp.error)
      return res.status(400).json({ status: false, message: resp.error });
    return res.status(200).json({ status: true, resp });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
});

authRouter.post("/mfaVerify", async (req, res, next) => {
  try {
    const { otp, mfaID } = req.body;
    console.log("OTP is", otp);
    console.log("id is", mfaID);
    // const { error } = otpValid({ otp, mfaID });
    // const clientType = req.headers["client-type"];
    // if (error)
    //   return res
    //     .status(400)
    //     .json({ status: "false", message: "Incorrect OTP entered" });
    const resp = await mfaVerify(mfaID, otp);
    console.log("resp is", resp);
    if (resp.error)
      return res
        .status(401)
        .json({ status: false, message: "Incorrect OTP entered" });
    else {
      if (clientType === "react-native") {
        res.status(200).json({
          access_token: resp.data.access_token,
          refresh_token: resp.data.refresh_token,
          expires_in: resp.data.expires_in,
        });
      } else {
        res
          .cookie("access", resp.data.access_token, {
            httpOnly: true, // Ensures the cookie is only accessible via HTTP(S), not JavaScript
            secure: true, // Ensures the cookie is only sent over HTTPS
            maxAge: resp.data.expires_in * 1000, // Sets the cookie expiration time
            sameSite: "lax",
            partitioned: true,
            signed: true,
          })
          .cookie("refresh", resp.data.refresh_token, {
            httpOnly: true, // Accessible only by the web server
            secure: true, // Transmit cookie only over HTTPS
            maxAge: 30 * 24 * 60 * 60 * 1000, // Refresh token typically has a longer lifespan (e.g., 30 days)
            sameSite: "lax", // Prevents CSRF attacks
            partitioned: true, // Ensures cookie isolation
            signed: true, // Prevents tampering with the cookie
          })
          .status(200)
          .json({
            status: true,
            message: "Sign in successfull",
            adminDat: !!resp.data.user.app_metadata.claims_admin,
          });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
});

authRouter.get("/signOut", async (req, res, next) => {
  try {
    const clientType = req.headers["client-type"];
    const response = await signMeOut();
    if (clientType && clientType === "react-native") {
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
