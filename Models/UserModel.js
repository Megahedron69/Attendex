// userModel.js
import mongoose from "mongoose";
import PasswordHash from "../middleware/passwordHash.js"; // Assuming your middleware is in the correct path
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is must"],
    unique: true,
    minLength: 2,
    lowercase: true,
    validate: {
      validator: (val) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(val);
      },
      message: (prop) => `${prop.value} does not match given conditions`,
    },
  },
  password: {
    type: String,
    // required: true,
    trim: true,
    minLength: 8,
    maxLength: 15,
    validate: {
      validator: (val) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/i.test(
          val
        );
      },
      message: (prop) => `${prop.value} doesnot match given condns`,
    },
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
export const Users = mongoose.model("users", userSchema);
