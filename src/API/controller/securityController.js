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
    const { id } = req.params;
    const { timeOut } = req.body;

    await ExeatModel.findOneAndUpdate(
      { _id: id },
      {
        time_out: timeOut,
      }
    );
  } catch (error) {
    res.json(error.message);
  }
};

const recordTimeIn = async (req, res) => {
  try {
    const { id } = req.params;
    const { timeIn, status } = req.body;

    await ExeatModel.findByIdAndUpdate(id, {
      time_in: timeIn,
      status: status,
    });
  } catch (error) {
    res.json(error.message);
  }
};

const resolveExeat = async (req, res) => {
  try {
    const { id } = req.params;
    await ExeatModel.findByIdAndUpdate(
      { _id: id },
      {
        status: "Resolved",
      }
    );
  } catch (error) {
    res.json(error.message);
  }
};

export { securityDashboard, recordTimeOut, recordTimeIn, resolveExeat };
