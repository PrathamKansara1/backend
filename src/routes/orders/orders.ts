import express from "express";
import { authenticateUser } from "../../middleware/authentication";
import { createOrder } from "../../controllers/orders/orders";

const router = express.Router();

router.route("/create").post(authenticateUser, createOrder);

export default router;
