import { Router } from "express";
import Joi from "joi";
import pool from "../config/pgConfig.cjs";

const authRouter = Router();

authRouter.post("/checkDets", (req, res) => {
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

authRouter.post("/checkEmail", async (req, res) => {
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
    res.json(isEmailExist);
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: err.message });
  }
});

export default authRouter;
