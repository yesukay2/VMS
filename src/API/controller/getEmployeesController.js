import EmployeeModel from "../Models/Employee.js";

const getEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);
  } catch (error) {
    res.json(error.message);
  }
};

export { getEmployees };
