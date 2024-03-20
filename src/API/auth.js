import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./Models/User.js";
import Request from "./Models/Request.js";
import { useReducer } from "react";
import verifyToken from "./Models/middleware.js";
import authPage from "./Middleware/middleware.js";

const router = Router();

router.post("/register-user", async (req, res) => {
  console.log(req.body);
  const { role, name, email, password, avatar } = req.body;
  try {
    const user = await User.create({
      role,
      email,
      password,
      name,
      avatar,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
    return user;
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

// router.get("/userinfo", verifyToken, async (req, res) => {
//   try {
//     const userId = req.user.userId;
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(404).json({ message: "User not found" });
//     }
//     res.json({ user });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post(
  "/request-exeat",
  //   authPage(["secretary", "manager", "admin"]),
  async (req, res) => {
    try {
      const {
        driverID,
        staffID,
        vehicleNumber,
        destination,
        purpose,
        signatory,
      } = req.body;

      const exeat = await exeat.create({
        driverID: driverID,
        staffID: staffID,
        vehicleNumber: vehicleNumber,
        destination: destination,
        purpose: purpose,
        dateRequested: Date.now(),
        signatory: signatory,
        status: "pending",
      });
      await exeat.save();
      res.status(201).json({ message: "Exeat request created successfully" });
      return exeat;
    } catch (error) {
      console.error("Exeat request failed!:", error);
      res.status(500).json({ message: "Exeat request failed!" });
    }
  }
);

export default router;
