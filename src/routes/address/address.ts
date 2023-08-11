import express from "express";
import { authenticateUser } from "../../middleware/authentication";
import { createAddress } from "../../controllers/address/address";

const router = express.Router();

router.route("/create").post(authenticateUser, createAddress);

export default router;
