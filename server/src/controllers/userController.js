import { validationResult } from "express-validator";
import * as userService from "../services/userService.js";
import redis from "../services/redisService.js";

export const createUserController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const user = await userService.createUser({ username, email, password });
    const token = user.generateToken(); // ✅ Fixed spelling mistake
    res.status(201).cookie("token", token).json({ message: "User created Successfully", user, token });
  } catch (error) {
    next(error); // ✅ Proper error handling
  }
};

export const loginUserController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await userService.loginUser({ email, password });

    // console.log(user); // ✅ Moved before return

    const token = user.generateToken(); // ✅ Fixed spelling mistake

    return res.status(200).cookie("token", token).json({ user, token });
  } catch (error) {
    next(error); // ✅ Proper error handling
  }
};

export const logoutController = async (req, res, next) => {
  try {
    res.send("logout");

    const timeRemainingForToken = req.tokenData.exp * 1000 - Date.now();

    await redis.set(
      `blacklist:${req.tokenData.token}`, // ✅ Fixed "blaclist" to "blacklist"
      true,
      "EX",
      Math.floor(timeRemainingForToken / 1000)
    );
  } catch (error) {
    next(error); // ✅ Proper error handling
  }
};
