
import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user-controller";

const router = express.Router();

router.post("/user", createUser);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

export default router;
