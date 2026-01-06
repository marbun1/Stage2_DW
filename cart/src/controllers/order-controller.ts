import { Request, Response } from "express";
import { orders, produks, Order } from "../models/cart-model";

export const getOrder = (req: Request, res: Response) => {
  res.json(orders);
};

export const createOrder = (req: Request, res: Response) => {
  const { productId, qty } = req.body;

  // melakukan cek produk
  const produk = produks.find((p) => p.id === Number(productId));
  if (!produk) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  const newOrder: Order = {
    id: orders.length + 1,
    productId: Number(productId),
    Qty: Number(qty),
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
};

export const deleteOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Order tidak ditemukan" });
  }

  orders.splice(index, 1);
  res.sendStatus(204);
};


export const updateOrder = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { productId, Qty } = req.body;

  const order = orders.find((p) => p.id === id);

  if (!order) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  order.productId = productId;
  order.Qty = Qty;

  res.json(order);
};
