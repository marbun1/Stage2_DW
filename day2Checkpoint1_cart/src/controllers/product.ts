import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id as string);
    const products = await prisma.product.findUnique({where : {id}});
    return res
      .status(200)
      .json({ message: "Data fetched successfully", data: products });
  } catch (error) {
    return res.status(500).json({
      message: "failed to fetch data"});
  }
};

export const getProducts = async ( req: Request,res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res
      .status(200)
      .json({ message: "Data fetched successfully", data: products });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
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