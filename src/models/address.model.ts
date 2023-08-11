import mongoose, { Schema } from "mongoose";
import { Address } from "../types/models/address/addressSchema";

const AddressSchema: Schema<Address> = new Schema({
  plot_no: {
    type: String,
    required: true,
  },
  street_colony: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: false,
  },
  taluka: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  archieved: {
    type: Number,
    required: true,
  },
});

export const AddressModel =
  mongoose.models.address || mongoose.model<Address>("address", AddressSchema);
