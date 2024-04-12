import EmployeeModel from "../Models/Employee.js";
import VehicleModel from "../Models/Vehicle.js";

const registerEmployee = async (req, res) => {
  const { Id_No, email, name, password, date, role } = req.body;

  try {
    const newEmployee = await EmployeeModel.create({
      Id_No: Id_No,
      email: email,
      name: name,
      password: password,
      date: date,
      role: role,
    });
    await newEmployee.save();
    res.json({ message: "New Employee Created!", newEmployee });
  } catch (error) {
    res.json(error.message);
  }
};

const registerVehicle = async (req, res) => {
  try {
    const { vehicle_type, make, model, make_year, reg_no, chassis_no, color } =
      req.body;

    const newVehicle = await VehicleModel.create({
      vehicle_type: vehicle_type,
      make: make,
      model: model,
      make_year: make_year,
      reg_no: reg_no,
      chassis_no: chassis_no,
      color: color,
    });

    await newVehicle.save();
    res.json({
      message: "New Vehicle Created!",
      newVehicle,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export { registerEmployee, registerVehicle };
