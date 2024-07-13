import VehicleModel from "../Models/Vehicle.js";

const getVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleModel.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.json(error.message);
  }
};

export { getVehicles };
