import { Response } from "express";
import { StatusCode } from "../statuscodes/statusCodes";
import { Client, User, Worker } from "../models/users/userSchema";

export type SendTokenPayload = {
  user: User | Worker | Client;
  statusCode: StatusCode;
  res: Response;
};
