import EmployeeModel from "../Models/Employee.js";
import jwt from "jsonwebtoken";
import process from "process";

const checkUserAuth = (req, res, next) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const tokenCheck = req.headers.authorization;

    const token = tokenCheck.split(" ")[1];
    if (!token) {
      return res.status(401).json("Authentication Required");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    res.status(200).json(req.user);
    next();
  } catch (error) {
    res.json(error.message);
  }
};

const checkParamRole = (req, res, next) => {
  try {
    const paramCheck = req.params.role;
    if (
      paramCheck === "admin" ||
      paramCheck === "manager" ||
      paramCheck === "receptionist"
    ) {
      next();
    }
  } catch (error) {
    res.json(error.message);
  }
};

const checkUserRole = (req, res, next) => {
  try {
    const userCheck = EmployeeModel.findOne({ _id: req.user._id }).role;
    if (
      userCheck === "admin" ||
      userCheck === "manager" ||
      userCheck === "receptionist"
    ) {
      next();
    }
  } catch (error) {
    res.json(error.message);
  }
};

export { checkParamRole, checkUserRole, checkUserAuth };
