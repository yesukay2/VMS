import express from "express";
import bodyParser from "body-parser";
import db from "./db.js";
import authRoutes from "./auth.js";
import process from "process";

const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
