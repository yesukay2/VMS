import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  subscription: {
    type: Object,
    required: true,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
