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
        }).then(res.status(200).json({ message: "New Employee Created!" }))
      : res.status(409).json({ message: "Employee Already Exists!" });
  } catch (error) {
    res.json(error);
  }
};

const registerVehicle = async (req, res) => {
  try {
    const {
      vehicle_type,
      make,
      model,
      make_year,
      reg_no,
      chassis_no,
      color,
      parking_lot,
    } = req.body;
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
          parking_lot: parking_lot,
          date: formatDate(),
        }).then(() => res.status(200).json({ message: "New Vehicle Created!" }))
      : res.status(409).json({ message: "Vehicle Already Exists!" });
  } catch (error) {
    res.json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const updateProfilePic = req.file ? req.file.path : undefined;

    const { Id_No } = req.params;
    const { name, email, role, password } = req.body;
    const user = await EmployeeModel.findOne({ Id_No: Id_No });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) {
      let newPassword = password;
      let hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }
    if (updateProfilePic) user.profilePic = updateProfilePic;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const {
      vehicle_type,
      make,
      model,
      make_year,
      reg_no,
      chassis_no,
      color,
      parking_lot,
    } = req.body;
    const vehicle = await VehicleModel.findOneAndUpdate({ reg_no: reg_no });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    if (vehicle_type) vehicle.vehicle_type = vehicle_type;
    if (make) vehicle.make = make;
    if (model) vehicle.model = model;
    if (make_year) vehicle.make_year = make_year;
    if (reg_no) vehicle.reg_no = reg_no;
    if (chassis_no) vehicle.chassis_no = chassis_no;
    if (color) vehicle.color = color;
    if (parking_lot) vehicle.parking_lot = parking_lot;
    await vehicle.save();
    res.status(200).json({ message: "Vehicle updated successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { Id_No } = req.params;
    const user = await EmployeeModel.findOne({ Id_No: Id_No });
    user == null
      ? res.status(404).json({ message: "User Not Found!" })
      : await EmployeeModel.deleteOne({ Id_No: Id_No }).then(() =>
          res.status(200).json({ message: "User Deleted!" })
        );
  } catch (error) {
    res.json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const { Id_No } = req.params;
    const user = await EmployeeModel.findOne({ Id_No: Id_No });
    res.status(200).json(user);
  } catch (error) {
    res.json(error.message);
  }
};

const getVehicle = async (req, res) => {
  try {
    const { reg_no } = req.params;
    const vehicle = await VehicleModel.findOne({ vehicleNumber: reg_no });

    res.status(200).json(vehicle);
  } catch (error) {
    res.json(error.message);
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const { reg_no } = req.params;
    const vehicle = await VehicleModel.findOne({ vehicleNumber: reg_no });
    vehicle == null
      ? res.status(404).json({ message: "Vehicle Not Found!" })
      : await VehicleModel.deleteOne({ vehicleNumber: reg_no }).then(() =>
          res.status(200).json({ message: "Vehicle Deleted!" })
        );
  } catch (error) {
    res.json(error);
  }
};
export {
  registerEmployee,
  registerVehicle,
  updateVehicle,
  updateUser,
  deleteUser,
  getUser,
  getVehicle,
  deleteVehicle,
};
