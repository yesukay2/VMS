import { Router } from "express";
import { registerVehicle } from "../controller/adminController.js";
import {
  checkParamRole,
  checkUserRole,
} from "../Middleware/registerActions.js";

const router = Router();

router.post(
  "/register-vehicle",
  [checkParamRole, checkUserRole],
  registerVehicle
);

export default router;
