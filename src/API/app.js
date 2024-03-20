import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import authRoutes from "./auth.js";
import process from "process";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", authRoutes);

app.listen(process.env.VITE_APP_PORT, () => {
  console.log(`Server is running on port ${process.env.VITE_APP_PORT}`);
  //   console.log(db);
});
