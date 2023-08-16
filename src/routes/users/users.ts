import express from "express";
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "@/controllers/users/users";

const router = express.Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/:usertype").get(getUsers);

export default router;
