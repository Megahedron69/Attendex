import { Router } from "express";
import pool from "../config/pgConfig.cjs";
import multer from "multer";
import sharp from "sharp";
import { uuidv8 } from "uuid-v8";
import { supabase } from "../config/supabaseConfig.js";
import { validateAdminData } from "../controllers/Validator.js";
const Dbrouter = Router();

const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png") {
      return cb(new Error("Only PNG files are allowed!"), false);
    }
    cb(null, true);
  },
});

Dbrouter.get("/uidGen", async (req, res, next) => {
  try {
    const result = uuidv8();
    res.json({ uid: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
});

Dbrouter.post("/profilePic", upload.single("file"), async (req, res) => {
  const { fileData } = req.body;
  const { userID, fileType } = JSON.parse(fileData);
  console.log(fileData, userID, fileType);
  let width, height, quality, bucketName, DestUrl;
  if (!userID || !fileType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const image = req.file;
  if (!image) {
    return res.status(400).json({ error: "File is required" });
  }

  switch (fileType) {
    case "Avatar":
      width = 120;
      height = 120;
      quality = 50;
      bucketName = "Avatars";
      DestUrl = `UserAvatars/${userID}`;

      break;
    case "Logo":
      width = 120;
      height = 120;
      quality = 60;
      bucketName = "Avatars";
      DestUrl = `CompanyLogos/${userID}`;

      break;
    case "Documents":
      width = 800;
      height = 1200;
      quality = 80;
      bucketName = "documents";
      DestUrl = `Proof/${userID}`;
      break;
    default:
      width = 20;
      height = 20;
      quality = 10;
      bucketName = "Avatars";
      DestUrl = `UserAvatars/err${userID}`;
      break;
  }

  try {
    const compressedBuffer = await sharp(image.buffer)
      .resize(width, height)
      .png({ quality: quality })
      .toBuffer();

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(DestUrl, compressedBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    const dataz = supabase.storage.from(bucketName).getPublicUrl(DestUrl);
    res.status(200).send({ url: dataz.data.publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Internal Server Error");
  }
});

Dbrouter.get("/admins", async (req, res, next) => {
  try {
    const selectQuery =
      "SELECT concat(first_name,' ',last_name) as name,admin_id from admin";
    const result = await pool.query(selectQuery);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json("No data");
    console.log("Server Error", err);
    next(err);
  }
});

Dbrouter.post("/createUser", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      gender,
      age,
      startDate,
      endDate,
      jobTitle,
      phone,
      address,
      profilePic,
      orgId,
    } = req.body;

    const insertQuery = `INSERT INTO employee(first_name, last_name, email_id, gender, age, start_date, end_date, job_title, contact, address, profile_picture,org_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,$12)`;
    const values = [
      firstName,
      lastName,
      email,
      gender,
      age,
      startDate,
      endDate,
      jobTitle,
      phone,
      address,
      profilePic,
      orgId,
    ];

    const result = await pool.query(insertQuery, values);
    console.log(result);

    if (result.rowCount > 0) {
      res.status(200).send("User Created");
    } else {
      res.status(404).send("User Creation Failed");
    }
  } catch (error) {
    console.log("User Creation Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

Dbrouter.post("/requestAdmin", async (req, res, next) => {
  try {
    const {
      fullName,
      emailId,
      orgName,
      logoURL,
      designation,
      avatarURL,
      docsURL,
      referenceId,
    } = req.body;
    const { error } = validateAdminData({
      fullName,
      emailId,
      orgName,
      logoURL,
      designation,
      avatarURL,
      docsURL,
      referenceId,
    });
    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.json({ status: false, message: errorMessages });
    }

    const docUrl = docsURL ? docsURL : null;
    const refId = referenceId ? referenceId : null;

    const insertQuery =
      "INSERT INTO adminApplication (fullName,orgName,emailId,logoURL,avatarURL,docsURL,designation,referenceId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
    const values = [
      fullName,
      orgName,
      emailId,
      logoURL,
      avatarURL,
      docUrl,
      designation,
      refId,
    ];
    const result = await pool.query(insertQuery, values);
    console.log(result);

    if (result) {
      return res.status(200).json({ status: true, message: "User Created" });
    } else {
      return res
        .status(404)
        .json({ status: false, message: "User Creation Failed" });
    }
  } catch (error) {
    console.log("User Creation Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

Dbrouter.post("/setClaim", async (req, res, next) => {
  try {
    const { uID, mID, mStat } = req.body;
    const claimName = "mfaStatus";
    const valObj = { mID: mID, mStat: mStat };
    //select set_claim('03acaa13-7989-45c1-8dfb-6eeb7cf0b92e', 'gamestate', '{"level": 5, "items": ["knife", "gun"], "position":{"x": 15, "y": 22}}');
    const SETQUERY = "SELECT set_claim($1,$2,$3)";
    const values = [uID, claimName, valObj];
    const resp = await pool.query(SETQUERY, values);
    console.log("dbRouter", uID, mID, mStat, resp);
    if (resp.rows.length > 0)
      return res.status(200).json({
        status: true,
        message: "Claim Set Successful",
      });
    else
      res.status(400).json({ status: false, message: "Unable to set claim" });
  } catch (err) {
    console.log(err);
    return { status: false, message: "Something went wrong" };
  }
});

Dbrouter.get("/organisations", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT org_name,org_id from organisation");
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(400).json("No data");
    console.log("Server Error", err);
    next(err);
  }
});

Dbrouter.get("/checkDatabase", async (req, res, next) => {
  try {
    const query = "SELECT 'Database is working' AS status";
    const result = await pool.query(query);

    res.json({ result: result.rows });
  } catch (err) {
    console.log("Error checking database:", err);
    next(err);
  }
});

export default Dbrouter;
