import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getProduct = async (req: Request,res: Response) => {
  const{
    sortBy,
    order,
    minPrice,
    maxPrice,
    limit,
    offset
  }=req.query
  
  const filters:any={}
  if(minPrice) filters.price = {gte: parseFloat(minPrice as string)};
  if (maxPrice){
    filters.price={
      ...(filters.price   || {}),
      lte: parseFloat(maxPrice as string),
    };
  }
  try {
    const products = await prisma.product.findMany({
      where:filters,
      orderBy:{
        [sortBy as string]: order as "asc" | "desc"
      },
      take : Number(limit),
      skip : Number(offset)
    });

    const total = await prisma.product.count({where : filters})
    res.json({data:products, total});
  } catch (error) {
    res.status(500).json({error:"failed to fecth data"});
  }
};

export const getOrderSummary = async (req: Request, res: Response) => {
  try {
    const summary = await prisma.order.groupBy({
      by: ["UserId"],
      _count: {
        id: true,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: summary.map((s) => s.UserId),
        },
      },
    });

    const result = summary.map((s) => {
      const user = users.find((u) => u.id === s.UserId);

      return {
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        },
        orderCount: s._count.id,
      };
    });

    res.json({
      message: "Orders summary by user",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        stock:req.body.stock,

      },
    });

    return res
      .status(201)
      .json({ message: "Data created successfully", data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        price: req.body.price,
      },
    });
    return res
      .status(200)
      .json({ message: "Data updated successfully", data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    return res
      .status(200)
      .json({ message: "Data deleted successfully", data: product });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};