import { Router } from "express";
import { requestExeat } from "../controller/requestController.js";
import {
  checkParamRole,
  checkUserRole,
  checkUserAuth,
} from "../Middleware/requestActions.js";
const router = Router();

router.post("/request-exeat/", requestExeat);

export default router;
