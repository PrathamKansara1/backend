import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserRoles, UserStatus } from "@/types/models/users/userSchema";

const UserSchema: Schema<User> = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: UserRoles,
      default: UserRoles.Client,
      required: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    aadhar_card: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: UserStatus,
      required: true,
    },
    orders: {
      type: [{ type: Schema.Types.ObjectId, ref: "orders" }],
      ref: "orders",
    },
    cancelled_orders: {
      type: [
        {
          order_id: {
            type: String,
            required: true,
          },
        },
      ],
    },
    current_orders: {
      type: [
        {
          order_id: {
            type: String,
            required: true,
          },
        },
      ],
    },
    archieved: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre<User>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1h",
  });
};

export const UserModel =
  mongoose.models.users || mongoose.model<User>("users", UserSchema);
