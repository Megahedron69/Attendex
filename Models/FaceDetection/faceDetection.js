import path from "path";
import * as faceapi from "@vladmandic/face-api";
import * as canvas from "canvas";
import "@tensorflow/tfjs-node";

export const extractFace = async (fileName) => {
  try {
    const currDir = process.cwd();
    const mPath = path.join(currDir, "/Models/FaceDetection");
    const iPath = path.join(currDir, `idCards/${fileName}`);
    const { Canvas, Image, createCanvas } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image });
    const img = await canvas.loadImage(iPath);
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(mPath);
    await faceapi.nets.faceExpressionNet.loadFromDisk(mPath); // Load face expression detection model
    await faceapi.nets.ageGenderNet.loadFromDisk(mPath); // Load age and gender detection model
    const detections = await faceapi.detectSingleFace(img);
    if (detections) {
      const paddingX = 20;
      const paddingY = 20;
      const { _x, _y, _width, _height } = detections.box;
      const faceWidth = _width + 2 * paddingX;
      const faceHeight = _height + 2 * paddingY;
      const faceX = Math.max(0, _x - paddingX);
      const faceY = Math.max(0, _y - paddingY);
      const faceCanvas = createCanvas(faceWidth, faceHeight);
      const faceCtx = faceCanvas.getContext("2d");
      faceCtx.drawImage(
        img,
        faceX,
        faceY,
        faceWidth,
        faceHeight,
        0,
        0,
        faceWidth,
        faceHeight
      );
      const faceBase64 = faceCanvas.toDataURL("image/png");
      const gender = await faceapi
        .detectSingleFace(faceCanvas)
        .withAgeAndGender();
      const age = gender.age;
      const genderValue = gender.gender;
      return { faceBase64, gender: genderValue, age };
    } else {
      res.status(404).send("No face detected in the image.");
    }
  } catch (err) {
    console.log("Error in face detection:" + err);
  }
};
