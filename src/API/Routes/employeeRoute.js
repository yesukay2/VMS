import { Router } from "express";
import { getEmployees } from "../controller/getEmployeesController.js";

const router = Router();

router.get("/employees", getEmployees);

export default router;
