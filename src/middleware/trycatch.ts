import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@/utils/errorHandler";
import { StatusCode } from "@/types/statuscodes/statusCodes";
import { AuthenticatedRequest } from "@/middleware/authentication";

type ExpressMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => void;

const trycatch =
  (func: ExpressMiddleware): ExpressMiddleware =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    Promise.resolve(func(req, res, next)).catch((err) => {
      console.log(err, "Error");
      next(new ErrorHandler("Internal server error", StatusCode.BadRequest));
    });
  };

export default trycatch;
