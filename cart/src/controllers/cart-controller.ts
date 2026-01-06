import { Request, Response } from "express";
import { produks, produk } from "../models/cart-model";

export const getProduk = (req: Request, res: Response) => {
  res.json(produks);
};

export const createProduk = (req: Request, res: Response) => {
  const { name, description, harga } = req.body;

  const newProduk: produk = {
    id: produks.length + 1,
    name,
    description,
    harga
  };

  produks.push(newProduk);
  res.status(201).json(newProduk);
};

export const deleteProduk = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = produks.findIndex((produk) => produk.id === Number(id));

  if (index === -1) {
    return res.sendStatus(404);
  }

  produks.splice(index, 1);
  return res.sendStatus(204); 

};

export const updateProduk = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, description, harga } = req.body;

  const produk = produks.find((p) => p.id === id);

  if (!produk) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  produk.name = name;
  produk.description = description;
  produk.harga = harga;

  res.json(produk);
};
