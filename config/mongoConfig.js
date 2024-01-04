import mongoose from "mongoose";
export const connectToMyDB = async () => {
  try {
    await mongoose.connect(process.env.mongoUri, {
      dbName: "CRUDpract",
    });
    console.log("anchors up");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
