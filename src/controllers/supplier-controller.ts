import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import AppError from "../../utils/app-error";

export const updateStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { updates } = req.body;
    /**
     updates: [
       { supplierId, productId, quantity }
     ]
    */

    // VALIDASI
    for (const u of updates) {
      if (u.quantity < 0) {
        return next(new AppError("Stock tidak boleh negatif", 400));
      }
    }

    // TRANSACTION + BATCH
    const result = await prisma.$transaction(
      updates.map((u: any) =>
        prisma.stock.upsert({
          where: {
            supplierId_productId: {
              supplierId: u.supplierId,
              productId: u.productId,
            },
          },
          update: {
            quantity: u.quantity,
          },
          create: {
            supplierId: u.supplierId,
            productId: u.productId,
            quantity: u.quantity,
          },
        })
      )
    );

    res.status(200).json({
      message: "Stock berhasil diperbarui",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getSuppliers = async (req: any, res: any, next: any) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        stocks: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(suppliers);
  } catch (err) {
    next(err);
  }
};

export const getStocks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stocks = await prisma.stock.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "List stock",
      data: stocks,
    });
  } catch (err) {
    next(err);
  }
};
