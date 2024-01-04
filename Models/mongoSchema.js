import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const { Schema } = mongoose;
import PasswordHash from "../middleware/passwordHash.js";
const mongoSchema = new Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    immutable: true,
  },
  firstName: {
    type: String,
    required: [true, "First Name required"],
    minLength: 3,
    maxLength: 15,
    trim: true,
    validate: {
      validator: (val) => {
        return /^[A-Za-z]{3,15}$/i.test(val);
      },
      message: (prop) => `${prop.value} doesnot match given condns`,
    },
  },
  lastName: {
    type: String,
    required: [true, "Last Name required"],
    minLength: 2,
    trim: true,
    validate: {
      validator: (val) => {
        return /^[A-Za-z]{2,10}$/i.test(val);
      },
      message: (prop) => `${prop.value} doesnot match given condns`,
    },
  },
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
      message: (prop) => `${prop.value} doesnot match given condns`,
    },
  },
  password: {
    type: String,
    required: true,
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
  mobileNumber: {
    type: Number,
    required: true,
    min: 1000000000,
    max: 999999999999,
    validate: {
      validator: (val) => {
        return /^[0-9]{10,12}$/i.test(val);
      },
      message: (prop) => `${prop.value} doesnot match given condns`,
    },
  },
  title: {
    type: String,
    default: "Mr",
    enum: ["Mr", "Mrs", "Miss", "Dr"],
    required: true,
  },
  developer: {
    type: Boolean,
    default: true,
    required: true,
  },
  married: {
    type: Boolean,
    default: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  links: {
    type: String,
    maxLength: 255,
    validate: {
      validator: (val) => {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(val);
      },
      message: (prop) => `${prop.value} doesnot match given condns`,
    },
  },
  comments: {
    type: String,
    maxLength: 280,
    minLength: 1,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 10,
    max: 99,
    validate: {
      validator: (val) => {
        return /^(1[0-9]|[2-9][0-9])$/i.test(val);
      },
      message: (prop) => `${prop.value} doesnot match given condns`,
    },
  },
});
PasswordHash(mongoSchema);
export const Biodata = mongoose.model("Crud", mongoSchema);
