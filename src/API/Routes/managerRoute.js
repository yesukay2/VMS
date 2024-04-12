import { Router } from "express";
import {
  updateStatus,
  manageRequests,
} from "../controller/managerController.js";
const router = Router();

router.put("/update-status/:id_no", updateStatus);

router.get("/manage-requests/", manageRequests);

export default router;
