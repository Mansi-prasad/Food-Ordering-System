import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeCashOnDelevery,
  placeOrder,
  updateStatus,
  userOrder,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/placeCashOnDelevery", authMiddleware, placeCashOnDelevery);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
