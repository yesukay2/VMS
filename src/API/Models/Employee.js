import mongoose from "mongoose";
const EmployeeSchema = new mongoose.Schema({
  Id_No: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  role: { type: String, required: true },
  profilePic: { type: String, required: true },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);

export default EmployeeModel;
