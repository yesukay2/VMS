import EmployeeModel from "../Models/Employee.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

const login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { email, password } = req.body;

  try {
    const existingUser = await EmployeeModel.findOne({
      email,
    });
    const passwordMatch = existingUser
      ? await bcrypt.compare(password, existingUser.password)
      : false;

    if (existingUser && passwordMatch) {
      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser.Id_No,
          role: existingUser.role,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      req.headers.authorization = `Bearer ${token}`;
      return res.json({
        message: "Login Successful",
        token: token,
        user: existingUser,
      });
    } else if (existingUser && !passwordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password!",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { login };
