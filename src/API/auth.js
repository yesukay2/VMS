import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./Models/User.js";
import { useReducer } from "react";
import verifyToken from "./Models/middleware.js";

const router = express.Router();

router.post("/register-user", async (req, res) => {
  try {
    const { role, email, password } = req.body;

    const user = await User.create({
      role,
      email,
      password,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("User registration failed!:", error);
    res.status(500).json({ message: "User registration failed!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/userinfo", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
