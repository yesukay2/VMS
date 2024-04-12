import ExeatModel from "../Models/ExeatRequest.js";

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id_no } = req.params;
    console.log(status, id_no);
    await ExeatModel.findOneAndUpdate(
      { _id: id_no },
      {
        status,
        time_declined:
          status === "Declined" ? Date.now() : new Date().setHours(0, 0, 0, 0),
        time_approved:
          status === "Approved" ? Date.now() : new Date().setHours(0, 0, 0, 0),
      }
    );
  } catch (error) {
    res.json(error.message);
  }
};

const manageRequests = async (req, res) => {
  try {
    const pendingRequests = await ExeatModel.find({
      status: "Pending",
    });
    res.json(pendingRequests);
  } catch (error) {
    res.json(error);
  }
};

export { updateStatus, manageRequests };
