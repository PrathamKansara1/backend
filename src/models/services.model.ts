import mongoose from "mongoose";

const ServiceScheama = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, // Fan, A.C, Washing Machine
  service_type: {
    type: String,
    required: true,
  }, // Home Appliances
  category: {
    type: String,
    required: true,
  }, // Electrician
  archieved: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Orders", ServiceScheama);
