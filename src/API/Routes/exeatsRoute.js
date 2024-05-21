import { Router } from "express";
import { getExeats } from "../controller/getExeatsController.js";

const router = Router();

router.get("/exeats", getExeats);

export default router;
