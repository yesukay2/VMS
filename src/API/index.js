import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import requestRoute from "./Routes/requestRoute.js";
import managerRoute from "./Routes/managerRoute.js";
import regEmployeeRoute from "./Routes/regEmployeeroute.js";
import regVehicleRoute from "./Routes/regVehicleRoute.js";
import securityRoute from "./Routes/securityRoute.js";
import process from "process";
import dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use("/vms", requestRoute);
app.use("/vms/manager", managerRoute);
// app.use("/vms/admin", adminRoute);
app.use("/vms/employee", regEmployeeRoute);
app.use("/vms/vehicle", regVehicleRoute);
app.use("/vms", securityRoute);

connect(process.env.VITE_APP_MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
  .then(app.listen(process.env.VITE_APP_PORT))
  .then(console.log(`${process.env.VITE_APP_PORT} connected`))
  .catch((e) => {
    console.log(e);
  });

export default app;
