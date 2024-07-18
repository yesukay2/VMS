import Subscription from "../Models/Subscription.js";

const storeSubscription = async (req, res) => {
  const subscription = req.body.subscription;
  try {
    await Subscription.create({ subscription });
    res.status(200).json({});
  } catch (error) {
    console.error("Error storing subscription:", error);
    res.status(500).json({ error: "Failed to store subscription" });
  }
};

export { storeSubscription };
