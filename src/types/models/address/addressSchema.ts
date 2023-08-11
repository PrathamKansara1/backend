import { Document } from "mongoose";

export interface Address extends Document {
  plot_no: string;
  street_colony: string;
  landmark: string;
  taluka: string;
  district: string;
  state: string;
  pincode: string;
  archieved: number;
}
