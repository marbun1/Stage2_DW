import express from "express";
import {
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/order-controller";

const router = express.Router();
router.get("/orders", getOrder);
router.post("/orders", createOrder);
router.delete("/orders/:id", deleteOrder);
router.put("/orders/:id", updateOrder);
export default router;
