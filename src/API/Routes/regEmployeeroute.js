import { Router } from "express";
import { registerEmployee } from "../controller/adminController.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./profilePic");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname`_${Date.now()}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/register-employee",
  upload.single("profilePic"),
  registerEmployee
);

export default router;
