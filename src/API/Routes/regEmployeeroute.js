import { Router } from "express";
import { registerEmployee } from "../controller/adminController.js";

const router = Router();

router.post("/register-employee", registerEmployee);

export default router;
