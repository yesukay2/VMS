import { Router } from "express";
import {
  securityDashboard,
  recordTimeOut,
  recordTimeIn,
  resolveExeat,
} from "../controller/securityController.js";

const router = Router();

router.put("/record-timeOut/:id", recordTimeOut);

router.put("/record-timeIn/:id", recordTimeIn);

router.put("/resolve-exeat/:id", resolveExeat);

router.get("/security-dashboard", securityDashboard);

export default router;
