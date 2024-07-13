import { Router } from "express";
import { getVehicles } from "../controller/getVehiclesController.js";

const router = Router();

router.get("/get-vehicles", getVehicles);

export default router;
