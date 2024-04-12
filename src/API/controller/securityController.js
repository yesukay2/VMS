import ExeatModel from "../Models/ExeatRequest.js";

const securityDashboard = async (req, res) => {
  try {
    const approvedRequests = await ExeatModel.find({ status: "Approved" });
    res.json(approvedRequests);
  } catch (error) {
    res.json(error);
  }
};

const recordTimeOut = async (req, res) => {
  try {
    const { id } = req.body;
    const set_timeOut = Date().now;
    await ExeatModel.findByIdAndUpdate(id, {
      time_out: set_timeOut,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const recordTimeIn = async (req, res) => {
  try {
    const { id } = req.body;
    const set_timeIn = Date().now;
    await ExeatModel.findByIdAndUpdate(id, {
      time_in: set_timeIn,
    });
  } catch (error) {
    res.json(error.message);
  }
};

export { securityDashboard, recordTimeOut, recordTimeIn };
