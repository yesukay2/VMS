import ExeatModel from "../Models/ExeatRequest.js";

const formatDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();
  let time = date.toLocaleTimeString();

  // Add leading zero if day or month is less than 10
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year} - ${time}`;
};

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
      time_logged: formatDate(),
      status: "Pending",
      time_out: "00:00",
      time_in: "00:00",
      time_approved: "00:00",
      time_declined: "00:00",
    });

    await newExeat.save();
    res.json({ message: "New Exeat Created!", newExeat });
  } catch (error) {
    res.json(error);
  }
};

export { requestExeat };
