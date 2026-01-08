import { request, response } from "express";
import { prisma } from "../connection/client";
export const getPosts = async (req = request, res = response) => {
  const { category } = req.query;

  const posts = await prisma.posts.findMany({
    where: category
      ? {
          category: {
            name: {
              equals: String(category),
              mode: "insensitive",
            },
          },
        }
      : {},
    include: {
      category: true,
      author: true,
    },
  });

  res.json(posts);
};



export const createPost = async (req = request, res = response) => {
  const { title, content, authorId, categoryId } = req.body;

  const post = await prisma.posts.create({
    data: {
      title,
      content,
      authorId,
      categoryId,
    },
  });

  res.status(201).json(post);
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
