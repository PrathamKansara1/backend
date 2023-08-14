import { NextFunction, Request, Response } from "express";
import { UserModel } from "@/models/users/user.model";
import { ErrorHandler } from "@/utils/errorHandler";
import trycatch from "@/middleware/trycatch";
import jwt from "jsonwebtoken";
import { StatusCode } from "@/types/statuscodes/statusCodes";
import { User } from "@/types/models/users/userSchema";

export interface AuthenticatedRequest extends Request {
  user?: User | null;
  id?: string;
}

export const authenticateUser = trycatch(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler(
          "Login required to access this..",
          StatusCode.Unauthorized
        )
      );
    }

    const data = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id: string;
      exp: number;
    };

    if (Date.now() >= data.exp * 1000) {
      return next(
        new ErrorHandler("Token has expired", StatusCode.Unauthorized)
      );
    }

    req.id = data.id as string;
    req.user = await UserModel.findById(data.id);
    next();
  }
);
