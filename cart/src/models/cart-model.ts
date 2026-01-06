export interface produk {
  id: number;
  name: string;
  description: string;
  harga: number;
}

export const produks: produk[] = [
  {
    id: 1,
    name: "laptop",
    description: "baterai awet lama",
    harga: 5000000,
  },
  {
    id: 2,
    name: "Sepatu",
    description: "bahan kulit",
    harga: 500000,
  },
  {
    id: 3,
    name: "mesin cuci",
    description: "hemat daya",
    harga: 3500000,
  },
];


export interface Order {
  id: number;
  productId: number;
  Qty: number;
}

export const orders: Order[] = [];