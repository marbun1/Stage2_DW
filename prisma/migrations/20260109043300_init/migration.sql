/*
  Warnings:

  - You are about to drop the column `stock` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supplierId,productId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "stock" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "stock";

-- CreateIndex
CREATE UNIQUE INDEX "Stock_supplierId_productId_key" ON "Stock"("supplierId", "productId");
