import { Schema, model } from "mongoose";

const requestSchema = new Schema({
  driverID: {
    type: String,
    required: true,
  },
  staffID: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  dateRequested: {
    type: Date,
    required: true,
  },
  signatory: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default model("Request", requestSchema);
