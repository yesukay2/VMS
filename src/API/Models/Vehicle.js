import mongoose from "mongoose";
const VehicleSchema = new mongoose.Schema({
  vehicle_type: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  make_year: { type: String, required: true },
  reg_no: { type: String, required: true },
  chassis_no: { type: String, required: true },
  color: { type: String, required: true },
});

const VehicleModel = mongoose.model("Vehicle", VehicleSchema);

export default VehicleModel;
