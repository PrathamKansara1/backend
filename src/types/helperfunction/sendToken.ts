import { Response } from "express";
import { StatusCode } from "@/types/statuscodes/statusCodes";
import { Client, User, Worker } from "@/types/models/users/userSchema";

export type SendTokenPayload = {
  user: User | Worker | Client;
  statusCode: StatusCode;
  res: Response;
};
