import express from "express";
import { Biodata } from "../Models/mongoSchema.js";
const router = express.Router();
router.post("/api", async (req, res, next) => {
  try {
    const bDat = new Biodata({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      mobileNumber: req.body.mobileNumber,
      title: req.body.title,
      developer: req.body.developer,
      married: req.body.married,
      links: req.body.links,
      comments: req.body.comments,
      age: req.body.age,
    });
    await bDat.save();
    console.log("Success");
  } catch (err) {
    console.log("error in bdat");
    next(err);
  }
});
router.get("/api/data", async (req, res, next) => {
  try {
    const allDat = await Biodata.find({});
    res.send(allDat);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
router.get("/something", (req, res) => {
  res.send("Merry Christme");
});

export default router;
