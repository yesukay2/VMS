import ExeatModel from "../Models/ExeatRequest.js";

const requestExeat = async (req, res) => {
  try {
    const {
      vehicle_no,
      destination,
      driver_id,
      driver_name,
      accomp_staff_id,
      accomp_staff_name,
      purpose,
      signatory,
    } = req.body;
    const newExeat = await ExeatModel.create({
      vehicle_no: vehicle_no,
      destination: destination,
      driver_id: driver_id,
      driver_name: driver_name,
      accomp_staff_id: accomp_staff_id,
      accomp_staff_name: accomp_staff_name,
      purpose: purpose,
      signatory: signatory,
      time_logged: new Date(),
      status: "Pending",
      time_out: Date("00:00"),
      time_in: Date("00:00"),
      time_approved: Date("00:00"),
      time_declined: Date("00:00"),
    });

    await newExeat.save();
    res.json({ message: "New Exeat Created!", newExeat });
  } catch (error) {
    res.json(error);
  }
};

export { requestExeat };
