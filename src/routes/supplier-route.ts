import express from "express";
import { getSuppliers, updateStock, getStocks } from "../controllers/supplier-controller";

const router = express.Router();

router.post("/suppliers/stock", updateStock);
router.get("/suppliers", getSuppliers);
router.get("/stocks", getStocks);

export default router;

