import { Router } from "express";
import { getUser } from "../controller/adminController.js";

const router = Router();

router.get("/get-user/:Id_No", getUser);

export default router;
