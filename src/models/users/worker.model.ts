import { Schema } from "mongoose";
import { Worker } from "../../types/models/users/userSchema";
import { UserModel } from "./user.model";

const WorkerSchema: Schema<Worker> = new Schema<Worker>({
  address_id: {
    type: Schema.Types.ObjectId,
    ref: "address",
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  visiting_charge: {
    type: Number,
    required: true,
  },
  experties: {
    type: [
      {
        service_name: { type: Array<String>, required: true },
        service_type: { type: String, required: true },
        service_category: { type: String, required: true },
      },
    ],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "reviews",
  },
});

export const WorkerModel = UserModel.discriminator<Worker>(
  "workers",
  WorkerSchema
);
