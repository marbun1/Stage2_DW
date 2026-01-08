import { request, response } from "express";
import { prisma } from "../connection/client";

export const getPosts = async (req = request, res = response) => {
  try {
    const fetchedPosts = await prisma.posts.findMany();
    res.status(200).json({
      message: "Posts fetched successfully",
      fetchedPosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const createPost = async (req = request, res = response) => {
  try {
    const { title, content, author } = req.body;
    const newPost = await prisma.posts.create({
      data: {
        title,
        content,
        author,
      },
    });
    res.status(201).json({
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const updatePost = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const updatedPost = await prisma.posts.update({
      where: { id: Number(id) },
      data: {
        title,
        content,
        author,
      },
    });
    res.status(200).json({
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const deletedPost = await prisma.posts.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      message: "Post deleted successfully",
      deletedPost,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
