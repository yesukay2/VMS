import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import requestRoute from "./Routes/requestRoute.js";
import managerRoute from "./Routes/managerRoute.js";
import regEmployeeRoute from "./Routes/regEmployeeroute.js";
import regVehicleRoute from "./Routes/regVehicleRoute.js";
import getVehiclesRoute from "./Routes/getVehiclesRoute.js";
import securityRoute from "./Routes/securityRoute.js";
import loginRoute from "./Routes/loginRoute.js";
import employeeRoute from "./Routes/employeeRoute.js";
import exeatRoute from "./Routes/exeatsRoute.js";
import deleteRoute from "./Routes/deleteUserRoute.js";
import updateUser from "./Routes/editUserRoute.js";
import updateVehicle from "./Routes/editVehicleRoute.js";
import getUser from "./Routes/getUserRoute.js";
import getVehicle from "./Routes/getVehicleRoute.js";
import deleteVehicle from "./Routes/deleteVehicleRoute.js";
import notifSubcription from "./Routes/SubcriptionRoute.js";
import Subscription from "./Models/Subscription.js";
import process from "process";
import dotenv from "dotenv";
import { ServerApiVersion } from "mongodb";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import webPush from "web-push";
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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
app.use("/vms", exeatRoute);
app.use("/vms", employeeRoute);
app.use("/vms/manager", managerRoute);
app.use("/vms/employee", regEmployeeRoute);
app.use("/vms/vehicle", regVehicleRoute);
app.use("/vms/vehicle", getVehiclesRoute);
app.use("/vms/vehicle", updateVehicle);
app.use("/vms/vehicle", getVehicle);
app.use("/vms/vehicle", deleteVehicle);
app.use("/vms/checkpoint", securityRoute);
app.use("/vms/employees", deleteRoute);
app.use("/vms/employee", updateUser);
app.use("/vms/employee", getUser);
app.use("/vms/subscribe", notifSubcription);
app.use("/uploads", express.static("uploads"));

const PUBLIC_VAPID_KEY =
  "BPi0KkQXj_Mdy3UaAghv6g3f8qoE1seZnr44CLFelwabDUcWNPsmy9TqFs5z-sOKoUO1qkz_cxVizDxCYNXcVCQ";

const PRIVATE_VAPID_KEY = "p--tfWRT3ChCmerXa_bEGp_0_6C9nwh2fwwkyGHWEtM";

mongoose
  .connect(process.env.VITE_APP_MONGO_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => app.listen(process.env.VITE_APP_PORT))
  .then(() => console.log(`${process.env.VITE_APP_PORT} connected`))
  .catch((e) => {
    console.log(e);
  });

// VAPID keys should be generated only once.
// You can use web-push library to generate VAPID keys if you don't have them.

webPush.setVapidDetails(
  "mailto:yesukay2@icloud.com",
  PUBLIC_VAPID_KEY,
  PRIVATE_VAPID_KEY
);

const sendNotification = async (subscription, dataToSend) => {
  try {
    await webPush.sendNotification(subscription, JSON.stringify(dataToSend));
  } catch (error) {
    console.error("Error sending notification:", error);
    if (error.statusCode === 410 || error.statusCode === 404) {
      // Subscription is no longer valid, delete it from the database
      try {
        await Subscription.deleteOne({ subscription });
        console.log("Deleted invalid subscription from the database");
      } catch (dbError) {
        console.error("Error deleting subscription from database:", dbError);
      }
    }
  }
};

const notifyManagers = async () => {
  const notificationPayload = {
    title: "New request added",
    body: "A new request has been added to the system.",
    icon: "src/assets/samara logo.jpg",
  };

  try {
    const subscriptions = await Subscription.find();
    subscriptions.forEach(({ subscription }) =>
      sendNotification(subscription, notificationPayload)
    );
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
  }
};

export default notifyManagers;
