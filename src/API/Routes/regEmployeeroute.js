import { Router } from "express";
import { registerEmployee } from "../controller/adminController.js";
import multer from "multer";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const uploadDirectory = join(__dirname, "../uploads/");
if (!fs.existsSync(uploadDirectory)) {
  console.log(`pic upload`);
  console.log(fs.existsSync(uploadDirectory));
  fs.mkdirSync(uploadDirectory, { recursive: true });
}
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "/src/API/uploads");
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/register-employee", upload.single("image"), registerEmployee);

export default router;
