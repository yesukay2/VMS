import mongoose from "mongoose";

const ExeatRequestSchema = new mongoose.Schema({
  vehicle_no: { type: String, required: true },
  destination: { type: String, required: true },
  driver_id: { type: String, required: true },
  driver_name: { type: String, required: true },
  accomp_staff_id: { type: String, required: false },
  accomp_staff_name: { type: String, required: true },
  purpose: { type: String, required: true },
  signatory: { type: String, required: true },
  status: { type: String, default: "Pending" },
  time_logged: { type: String },
  time_approved: { type: String, default: Date("00:00") },
  time_declined: { type: String },
  time_out: { type: String },
  time_in: { type: String },
});

const ExeatModel = mongoose.model("Exeat_Request", ExeatRequestSchema);

export default ExeatModel;
