import mongoose, { Schema } from "mongoose";

const ReviewsSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  workerId: {
    type: Schema.Types.ObjectId,
    ref: "workers",
    required: true,
  },
  archieved: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Reviews", ReviewsSchema);
