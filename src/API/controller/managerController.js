import ExeatModel from "../Models/ExeatRequest.js";

const formatDate = () => {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1; // Months are zero-based
  let year = date.getFullYear();

  // Add leading zero if day or month is less than 10
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;

  return `${day}-${month}-${year}`;
};

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
          status === "Declined"
            ? formatDate()
            : new Date().setHours(0, 0, 0, 0),
        time_approved:
          status === "Approved"
            ? formatDate()
            : new Date().setHours(0, 0, 0, 0),
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
