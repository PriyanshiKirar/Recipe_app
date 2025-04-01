import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is reuired"],
    unique: [true, "username already exists"], //iska mtlb user h user save name ka ni hoga
    trim: true,
    lowercase: true,
    minLength: [3, "username must be 3 characters"],
    maxLength: [15, "username must be 20 characters"],
  },
  email: {
    type: String,
    required: [true, "email is reuired"],
    unique: [true, "email already existsa"],
    trim: true,
    lowercase: true,
    minLength: [6, "email must be 6 characters"],
    maxLength: [40, "email must be 50 characters"],
  },
  profileImage: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fdefault-profile-picture-avatar-user-icon-vector-46389216&psig=AOvVaw2iSssTSgLxmPvetE4TNBLg&ust=1740384210020000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjxkMuq2YsDFQAAAAAdAAAAABAE",
  },
  password: {
    type: String,
  },
});

userSchema.statics.hashPassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }

  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.comparePassword = async function (password) {
  if (!password) {
    throw new Error("Password is required");
  }
  if (!this.password) {
    throw new Error("Password is required");
  }
  return bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRES_IN,
    }
  );
  return token;
};

userSchema.statics.verifyToken = function (token) {
  if (!token) {
    throw new Error("token is required");
  }
  return jwt.verify(token, config.JWT_SECRET);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;
