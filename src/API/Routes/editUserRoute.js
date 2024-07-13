import { Router } from "express";
import { updateUser } from "../controller/adminController.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const uploadDirectory = "uploads/";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const formatDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year}`;
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.name + "-" + formatDate() + path.extname(file.originalname)
    );
  },
});
const uploadUpdate = multer({ storage: storage });

router.put(
  "/update-user/:Id_No",
  uploadUpdate.single("profilePic"),
  updateUser
);

export default router;
