import { body } from "express-validator";
import redis from "../services/redisService.js";
import User from "../models/userModel.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
export const registerMiddleware = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be between 3 and 15 characters")
    .custom((value) => value === value.toLowerCase())
    .withMessage("Username must be in lowercase"),
  body("email").isEmail().withMessage("Email must be a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

export const loginUserMiddleware = [
  body("email").isEmail().withMessage("Email must be a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Check if token is blacklisted
    const isTokenBlacklisted = await redis.get(`blacklist:${token}`);
    if (isTokenBlacklisted) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Blacklisted token" });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Check Redis for cached user data
    let user = await redis.get(`user:${decoded._id}`);

    if (user) {
      user = JSON.parse(user);
    } else {
      user = await User.findById(decoded._id);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized - User not found" });
      }

      // Exclude password before caching
      const { password, ...userData } = user.toObject();
      await redis.set(`user:${decoded._id}`, JSON.stringify(userData));

      user = userData;
    }

    req.user = user;
    req.tokenData = { token, ...decoded };
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
