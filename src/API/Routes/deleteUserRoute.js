import { Router } from "express";
import { deleteUser } from "../controller/adminController.js";

const router = Router();

router.delete("/delete-user/:Id_No", deleteUser);

export default router;
