import { request, response } from "express";
import { prisma } from "../connection/client";

export const getCommentsByPost = async (req = request, res = response) => {
  const postId = Number(req.params.id);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const comments = await prisma.comments.findMany({
    where: { postId },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  res.json({ page, limit, comments });
};

export const getCommentsSummary = async (req = request, res = response) => {
  const summary = await prisma.comments.groupBy({
    by: ["postId"],
    _count: { postId: true },
    orderBy: {
      _count: { postId: "desc" },
    },
  });

  const result = summary.map((item) => ({
    postId: item.postId,
    totalComments: item._count.postId,
  }));
  

  res.json(result);
};

