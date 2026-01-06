import { Request, Response } from "express";
import { posts, Post } from "../models/post-model";

export const getPosts = (req: Request, res: Response) => {
  res.json(posts);
};

export const createPosts = (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newPost: Post = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

export const deletePosts = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = posts.findIndex((post) => post.id === Number(id));

  if (index === -1) {
    return res.sendStatus(404);
  }

  posts.splice(index, 1);
  return res.sendStatus(204); 

};

