import express from "express";
import {
  getClients,
  getWorkers,
  loginUser,
  registerUser,
} from "@/controllers/users/users";

const router = express.Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/clients").get(getClients);
router.route("/workers").get(getWorkers);

export default router;
