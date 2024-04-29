import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import requestRoute from "./Routes/requestRoute.js";
import managerRoute from "./Routes/managerRoute.js";
import regEmployeeRoute from "./Routes/regEmployeeroute.js";
import regVehicleRoute from "./Routes/regVehicleRoute.js";
import securityRoute from "./Routes/securityRoute.js";
import loginRoute from "./Routes/loginRoute.js";
import process from "process";
import dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import {
  checkParamRole,
  checkUserRole,
  checkUserAuth,
} from "../API/Middleware/requestActions.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use("/vms", loginRoute);
app.use("/vms", requestRoute);
app.use("/vms/manager", managerRoute);
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
