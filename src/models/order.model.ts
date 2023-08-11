import mongoose, { Schema } from "mongoose";
import { Order, OrderStatus } from "../types/models/orders/orderSchema";

const OrderSchema: Schema<Order> = new Schema({
  service_name: {
    type: String,
    required: true,
  },
  service_type: {
    type: String,
    required: true,
  },
  service_category: {
    type: String,
    required: true,
  },
  service_place: {
    type: String,
    required: true,
  },
  address: {
    type: Schema.Types.ObjectId,
    // required: true,   // Todo : remove comment
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "clients",
    required: true,
  },
  worker: {
    type: Schema.Types.ObjectId,
    ref: "workers",
    required: true,
  },
  order_status: {
    type: String,
    enum: OrderStatus,
    required: true,
    default: OrderStatus.Initial,
  },
  archieved: {
    type: Number,
    required: true,
  },
});

export const OrderModel =
  mongoose.models.orders || mongoose.model<Order>("orders", OrderSchema);
