import { Router } from "express";
import { storeSubscription } from "../controller/subscriptionController.js";

const router = Router();

router.post("/store-subscription", storeSubscription);

export default router;
