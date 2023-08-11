import { Document, Schema } from "mongoose";

export enum UserRoles {
  SuperAdmin = "super_admin",
  Admin = "admin",
  Client = "client",
  Worker = "worker",
}

export enum UserStatus {
  Inactive = "inactive",
  Active = "active",
}

export interface Worker extends User {
  address_id: Schema.Types.ObjectId;
  experience: number;
  visiting_charge: number;
  experties: Array<{
    service_name: Array<string>;
    service_type: string;
    service_category: string;
  }>;
  rating: number;
  reviews?: Array<Schema.Types.ObjectId>;
}

export interface Client extends User {
  addresses?: Array<{
    address_id: Schema.Types.ObjectId;
  }>;
}

export interface User extends Document {
  _id: string;
  username: string;
  role: UserRoles;
  email?: string;
  mobile: string;
  password: string;
  photo?: string;
  aadhar_card?: string;
  description?: string;
  status: UserStatus;
  orders?: Array<{
    order_id: string;
  }>;
  cancelled_orders?: Array<{
    order_id: string;
  }>;
  current_orders?: Array<{
    order_id: string;
  }>;
  archieved: number;
  getJwtToken(): string;
}
