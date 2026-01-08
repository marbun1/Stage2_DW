import express  from "express";
import { transferPoints, getUserPoints } from "../controllers/transferPoint-controller";

const router = express.Router();


router.post('/transfer-points', transferPoints)
router.get("/user-point/:userId", getUserPoints);

export default router;