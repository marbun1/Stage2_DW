import express from "express";
import { getProduct, getOrderSummary} from "../controllers/product-controller";

const router = express.Router();

router.get("/products", getProduct)
router.get("/orders/summary", getOrderSummary);


export default router;
