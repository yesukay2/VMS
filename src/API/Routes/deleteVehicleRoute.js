import { Router } from "express";
import { deleteVehicle } from "../controller/adminController.js";

const router = Router();

router.delete("/delete-vehicle/:vehicleNumber", deleteVehicle);

export default router;
