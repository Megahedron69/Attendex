import express from "express";
import { extractFace } from "../Models/FaceDetection/faceDetection.js";
import { extractText } from "../Models/OCR/tesseractEngine.js";
import { nlpe } from "../Models/NLP/compromise.js";
import { upload } from "../config/multerConfig.js";
import { isUserInGeofence } from "../controllers/Attendance.js";
import { coordinatesValid } from "../controllers/Validator.js";

const smartRoutes = express.Router();

smartRoutes.post(
  "/extraction",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const faceVal = await extractFace(req.file.filename);
      const textVal = await extractText(req.file.filename);
      const processedVal = await nlpe(textVal);
      res.status(200).send({
        uid: req.file.filename.replace(/\.png$/, ""),
        inputVal: processedVal,
        face: faceVal ? faceVal : "",
      });
    } catch (err) {
      res.status(500).send("Error processing image with error:" + err);
    }
  }
);

smartRoutes.post("/geoFencing", async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body;
    const { error } = coordinatesValid({ latitude, longitude });
    if (error)
      return res.status(401).json({ status: false, message: error.message });
    console.log(isUserInGeofence(longitude, latitude));
    if (isUserInGeofence(longitude, latitude))
      return res.status(200).json({ status: true });
    else return res.status(400).json({ status: false });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

smartRoutes.get("/scanImage", async (req, res, next) => {
  res.status(200).json({ message: "Working hai bhai" });
});

export default smartRoutes;
