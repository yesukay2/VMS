import { Router } from "express";
import { getVehicle } from "../controller/adminController.js";

const router = Router();

router.get("/get-vehicle/:vehicleNumber", getVehicle);

export default router;
