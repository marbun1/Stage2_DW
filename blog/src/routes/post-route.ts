import express from "express";
import { getPosts, createPosts, deletePosts } from "../controllers/post-controller";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/posts", createPosts);
router.delete("/posts/:id", deletePosts);

export default router;
