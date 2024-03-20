import mongoose from "mongoose";
import process from "process";
import { ServerApiVersion } from "mongodb";
// import { connect } from "mongoose";
// import express from "express";

// export const app = express();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      version: ServerApiVersion.v1,
      deprecationErrors: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
