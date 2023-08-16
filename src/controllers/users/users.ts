import { sendToken } from "@/helper/sendToken";
import trycatch from "@/middleware/trycatch";
import { ClientModel } from "@/models/users/client.model";
import { UserModel } from "@/models/users/user.model";
import { WorkerModel } from "@/models/users/worker.model";
import {
  Client,
  User,
  UserRoles,
  Worker,
} from "@/types/models/users/userSchema";
import { StatusCode } from "@/types/statuscodes/statusCodes";
import { ErrorHandler } from "@/utils/errorHandler";

export const getUsers = trycatch(async (req, res, next) => {
  let user: Client[] | Worker[] = [];
  switch (req.params.usertype) {
    case UserRoles.Client:
      user = await ClientModel.find({ archieved: 0 });
      break;
    case UserRoles.Worker:
      user = await WorkerModel.find({ archieved: 0 });
      break;
    default:
      return next(
        new ErrorHandler("Invalid user role given", StatusCode.BadRequest)
      );
  }

  if (user.length === 0) {
    return next(new ErrorHandler("No user found", StatusCode.BadRequest));
  }

  res.status(StatusCode.OK).json({ success: true, user });
});
export const registerUser = trycatch(async (req, res, next) => {
  const requestBody: Client | Worker = req.body;
  const { mobile } = requestBody;
  const isDuplicateUser = await UserModel.find({ mobile, archieved: 0 });
  if (isDuplicateUser.length > 0) {
    return next(
      new ErrorHandler("Duplicate user found", StatusCode.BadRequest)
    );
  }
  let user: Client | Worker;
  switch (requestBody.role) {
    case UserRoles.Client:
      user = await ClientModel.create(req.body);
      user.save();
      break;
    case UserRoles.Worker:
      user = await WorkerModel.create(req.body);
      user.save();
      break;
    default:
      return next(
        new ErrorHandler("Invalid role of user", StatusCode.Unauthorized)
      );
  }

  if (!user) {
    return next(new ErrorHandler("Unable to save user", StatusCode.Forbidden));
  }

  sendToken({ user, statusCode: StatusCode.Created, res });
});
export const loginUser = trycatch(async (req, res, next) => {
  const requestBody: Client | Worker = req.body;
  const { mobile, password } = requestBody;
  if (!mobile || !password) {
    return next(
      new ErrorHandler(
        "Please enter complete login details",
        StatusCode.Unauthorized
      )
    );
  }
  const user = await UserModel.findOne({ mobile }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Invalid credentials", StatusCode.Unauthorized)
    );
  }

  const matchPassword = await user.comparePassword(password);
  if (!matchPassword) {
    return next(
      new ErrorHandler("Invalid credentials", StatusCode.Unauthorized)
    );
  }
  sendToken({ user, statusCode: StatusCode.OK, res });
});

export const logoutUser = trycatch(async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res
    .status(StatusCode.OK)
    .json({ success: true, message: "User logged out successfully" });
});
