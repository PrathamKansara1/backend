import { Document, Schema } from "mongoose";

export enum OrderStatus {
  Initial = "initial",
  Active = "active",
  completed = "completed",
}

export interface Order extends Document {
  service_name: string;
  service_type: string;
  service_category: string;
  service_place: string;
  address: Schema.Types.ObjectId;
  client: Schema.Types.ObjectId;
  worker: Schema.Types.ObjectId;
  order_status: OrderStatus;
  archieved: number;
}
