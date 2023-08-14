import { StatusCode } from "@/types/statuscodes/statusCodes";

export class ErrorHandler extends Error {
  statusCode: StatusCode;
  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
