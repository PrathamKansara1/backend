import { Schema } from "mongoose";
import { Client } from "@/types/models/users/userSchema";
import { UserModel } from "@/models/users/user.model";

const ClientSchema: Schema<Client> = new Schema<Client>({
  addresses: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "address",
      },
    ],
  },
});

export const ClientModel = UserModel.discriminator<Client>(
  "clients",
  ClientSchema
);
