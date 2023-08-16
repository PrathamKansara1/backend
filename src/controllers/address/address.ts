import trycatch from "@/middleware/trycatch";
import { AddressModel } from "@/models/address.model";
import { ClientModel } from "@/models/users/client.model";
import { WorkerModel } from "@/models/users/worker.model";
import { Address } from "@/types/models/address/addressSchema";
import { UserRoles } from "@/types/models/users/userSchema";
import { StatusCode } from "@/types/statuscodes/statusCodes";
import { ErrorHandler } from "@/utils/errorHandler";

export const createAddress = trycatch(async (req, res, next) => {
  const address: Address = new AddressModel(req.body);
  await address.save();

  if (!address) {
    return next(
      new ErrorHandler("Unable to save your info", StatusCode.BadRequest)
    );
  }

  switch (req.user?.role) {
    case UserRoles.Client:
      const saveClientAddress = await ClientModel.findByIdAndUpdate(req.id, {
        $push: { addresses: address._id },
      }).lean();

      if (!saveClientAddress) {
        return next(
          new ErrorHandler("Unable to save your info", StatusCode.BadRequest)
        );
      }
      break;

    case UserRoles.Worker:
      const saveWorkerAddress = await WorkerModel.findByIdAndUpdate(
        req.id,
        { address_id: address._id },
        { lean: true }
      );

      if (!saveWorkerAddress) {
        return next(
          new ErrorHandler("Unable to save your info", StatusCode.BadRequest)
        );
      }
      break;

    default:
      break;
  }

  res.status(StatusCode.Created).json({ success: true, address });
});
