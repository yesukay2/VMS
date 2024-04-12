import { Router } from "express";
import {
  securityDashboard,
  recordTimeOut,
  recordTimeIn,
} from "../controller/securityController.js";

const router = Router();

router.put("/record-timeOut", recordTimeOut);

router.put("record-timeIn", recordTimeIn);

router.get("/security-dashboard", securityDashboard);

export default router;
