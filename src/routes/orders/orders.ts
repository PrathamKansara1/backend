import express from "express";
import { authenticateUser } from "@/middleware/authentication";
import { createOrder, getOrders } from "@/controllers/orders/orders";

const router = express.Router();

router.route("/create").post(authenticateUser, createOrder);
router.route("/orders").get(authenticateUser, getOrders);

export default router;
