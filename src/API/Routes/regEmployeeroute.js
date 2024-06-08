import { Router } from "express";
import { registerEmployee } from "../controller/adminController.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Profile-Pics");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname`_${Date.now()}`);
  },
});

const upload = multer({ storage: storage });

router.post("/register-employee", upload.single("Profile"), registerEmployee);

export default router;
