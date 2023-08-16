import trycatch from "@/middleware/trycatch";
import { OrderModel } from "@/models/order.model";
import { UserModel } from "@/models/users/user.model";
import { StatusCode } from "@/types/statuscodes/statusCodes";
import { ErrorHandler } from "@/utils/errorHandler";

export const createOrder = trycatch(async (req, res, next) => {
  const order = await OrderModel.create(req.body);
  if (!order) {
    return next(
      new ErrorHandler("Unable to create order", StatusCode.BadRequest)
    );
  }
  order.save();

  const userId = req.id;
  await UserModel.findByIdAndUpdate(userId, { $push: { orders: order._id } });

  res.status(StatusCode.Created).json({ success: true, order });
});

export const getOrders = trycatch(async (req, res, next) => {
  const orders = await OrderModel.find({ archieved: 0 })
    .populate("client")
    .populate("worker");

  if (!orders) {
    return next(new ErrorHandler("No orders found", StatusCode.NotFound));
  }
  res.status(StatusCode.OK).json({ success: true, orders });
});
