import { Router } from "express";
import { updateVehicle } from "../controller/adminController.js";

const router = Router();

router.put("/update-vehicle/", updateVehicle);

export default router;
