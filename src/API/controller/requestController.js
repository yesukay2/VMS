import ExeatModel from "../Models/ExeatRequest.js";

const requestExeat = async (req, res) => {
  try {
    const {
      vehicle_no,
      destination,
      driver_id,
      accomp_staff_id,
      purpose,
      signatory,
    } = req.body;
    const newExeat = await ExeatModel.create({
      vehicle_no: vehicle_no,
      destination: destination,
      driver_id: driver_id,
      accomp_staff_id: accomp_staff_id,
      purpose: purpose,
      signatory: signatory,
    });

    await newExeat.save();
    res.json({ message: "New Exeat Created!", newExeat });

    if (
      !vehicle_no ||
      !destination ||
      !driver_id ||
      !accomp_staff_id ||
      !purpose ||
      !signatory
    ) {
      res.json({ message: "All fields are required" });
    }
  } catch (error) {
    res.json(error);
  }
};

export { requestExeat };
