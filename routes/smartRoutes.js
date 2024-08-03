import express from "express";
import { extractFace } from "../Models/FaceDetection/FaceDetection.js";
import { extractText } from "../Models/OCR/tesseractEngine.js";
import { nlpe } from "../Models/NLP/compromise.js";
import { upload } from "../config/multerConfig.js";

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

smartRoutes.get("/scanImage", async (req, res, next) => {
  res.status(200).json({ message: "Working hai bhai" });
});

export default smartRoutes;
