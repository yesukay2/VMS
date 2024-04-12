import { Router } from "express";
import { registerVehicle } from "../controller/adminController.js";

const router = Router();

router.post("/register-vehicle", registerVehicle);

export default router;
