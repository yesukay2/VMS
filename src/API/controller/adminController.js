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

const updateUser = async (req, res) => {
  const { Id_No } = req.params;
  const { name, email, role } = req.body;
  let { password } = req.body;
  const profilePic = req.file ? req.file.path : null; // Assuming you handle file uploads

  try {
    // Find the user by ID
    const user = await EmployeeModel.findOne({ Id_No: Id_No });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields if they exist in the request
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (password) {
      // Hash the password before saving
      password = await bcrypt.hash(password, 10);
      user.password = password;
    }
    if (profilePic) user.profilePic = profilePic;

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
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
export { registerEmployee, registerVehicle, updateUser, deleteUser, getUser };
