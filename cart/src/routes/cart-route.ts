import express from "express";
import { getProduk, createProduk, deleteProduk, updateProduk, } from "../controllers/cart-controller";

const router = express.Router();

router.get("/produks", getProduk);
router.post("/produks", createProduk);
router.delete("/produks/:id", deleteProduk);
router.put("/produks/:id", updateProduk);

export default router;
