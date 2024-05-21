import ExeatModel from "../Models/ExeatRequest.js";

const getExeats = async (req, res) => {
  try {
    const exeats = await ExeatModel.find();
    res.status(200).json(exeats);
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export { getExeats };
