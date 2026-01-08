import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post-controller";

import {
  getCommentsByPost,
  getCommentsSummary,
} from "../controllers/comment-controller";

const router = express.Router();

router.get("/posts", getPosts);
router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

router.get("/posts/:id/comments", getCommentsByPost);
router.get("/posts/comments-summary", getCommentsSummary);

export default router;
