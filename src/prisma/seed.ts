import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // 
  await prisma.order.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.supplier.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // USERS
  await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@gmail.com", points: 1500 },
      { name: "Ayu", email: "ayu@gmail.com", points: 800 },
      { name: "Andini", email: "andini@gmail.com", points: 300 },
    ],
  });

  //  PRODUCTS
  await prisma.product.createMany({
    data: [
      { name: "Keyboard", price: 350_000, stock: 10 },
      { name: "Mouse", price: 30_000, stock: 15 },
      { name: "Monitor", price: 700_000, stock: 20 },
      { name: "Laptop", price: 8_050_000, stock: 5 },
    ],
  });

  //  SUPPLIERS
  await prisma.supplier.createMany({
    data: [
      { name: "Supplier A" },
      { name: "Supplier B" },
      { name: "Supplier C" },
      { name: "Supplier D" },
      { name: "Supplier E" },
    ],
  });

  //  STOCKS (supplier ↔ product)
  await prisma.stock.createMany({
    data: [
      { supplierId: 1, productId: 1, quantity: 100 },
      { supplierId: 2, productId: 1, quantity: 80 },
      { supplierId: 3, productId: 2, quantity: 120 },
      { supplierId: 4, productId: 3, quantity: 60 },
      { supplierId: 5, productId: 4, quantity: 150 },
    ],
  });

  //  ORDERS
  await prisma.order.createMany({
    data: [
      { UserId: 1, productId: 1, quantity: 2 },
      { UserId: 1, productId: 2, quantity: 1 },
      { UserId: 2, productId: 3, quantity: 1 },
      { UserId: 3, productId: 4, quantity: 4 },
    ],
  });

  console.log("✅ Seeding completed");
}

seed()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
