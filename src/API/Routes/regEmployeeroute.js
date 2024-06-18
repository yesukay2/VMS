import { Router } from "express";
import { registerEmployee } from "../controller/adminController.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/API/Images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post(
  "/register-employee",
  upload.single("profilePic"),
  registerEmployee
);

export default router;
