import { Router } from "express";
import { requestExeat } from "../controller/requestController.js";
const router = Router();

router.post("/request-exeat", requestExeat);

export default router;
