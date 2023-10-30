-- CreateEnum
CREATE TYPE "Category" AS ENUM ('smartphones', 'furniture', 'electronics', 'appliances', 'refrigerators');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "promotionalPrice" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discounts" (
    "id" TEXT NOT NULL,
    "productType" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Discounts_pkey" PRIMARY KEY ("id")
);
