import { Router } from "express";
// import { decryptDat } from "../controllers/Encryption.js";
const markitRouter = Router();

markitRouter.get("/nfc", (req, res, next) => {
  console.log("hello");
});

export default markitRouter;
