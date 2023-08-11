import { SendTokenPayload } from "../types/helperfunction/sendToken";

export const sendToken = ({ user, statusCode, res }: SendTokenPayload) => {
  const token: string = user.getJwtToken();

  const Options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, Options)
    .json({ success: true, user, token });
};
