import EmployeeModel from "../Models/Employee.js";
import VehicleModel from "../Models/Vehicle.js";
import process from "process";
import bcrypt from "bcrypt";

const formatDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year}`;
};
const registerEmployee = async (req, res) => {
  try {
    const { Id_No, email, name, password, role } = req.body;
    const profilePic = req.file.path;
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await EmployeeModel.findOne({ email: email });
    user == null
      ? await EmployeeModel.create({
          Id_No: Id_No,
          email: email,
          name: name,
          password: hashedPassword,
          date: formatDate(),
          role: role,
          profilePic: profilePic,
        }).then(() =>
          res.status(201).json({ message: "New Employee Created!" })
        )
      : res.status(409).json({ message: "Employee Already Exists!" });
  } catch (error) {
    res.json(error);
  }
};

const registerVehicle = async (req, res) => {
  const { vehicle_type, make, model, make_year, reg_no, chassis_no, color } =
    req.body;

  try {
    const vehicleExists = await VehicleModel.findOne({ reg_no: reg_no });

    vehicleExists == null
      ? await VehicleModel.create({
          vehicle_type: vehicle_type,
          make: make,
          model: model,
          make_year: make_year,
          reg_no: reg_no,
          chassis_no: chassis_no,
          color: color,
          date: formatDate(),
        }).then(() => res.status(201).json({ message: "New Vehicle Created!" }))
      : res.status(409).json({ message: "Vehicle Already Exists!" });
  } catch (error) {
    res.json(error);
  }
};

export { registerEmployee, registerVehicle };
