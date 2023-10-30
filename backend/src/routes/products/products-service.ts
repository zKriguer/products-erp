import { prisma } from "../../PrismaService";
import { Prisma } from "@prisma/client";

const createProduct = async (product: Prisma.ProductCreateInput) => {
  await prisma.product.create({ data: product });
};

const getProducts = async () => {
  const [discounts, products] = await Promise.all([
    prisma.discounts.findMany({
      select: { productType: true, value: true },
    }),
    prisma.product.findMany(),
  ]);

  const productsWithDiscount = products.map((product) => {
    const discount = discounts.find(
      (discount) => discount.productType === product.category,
    );
    const price = Number(product.price);
    const discountValue = Number(discount?.value) || 0;

    return {
      ...product,
      price,
      promoPrice: price - price * (discountValue / 100),
    };
  });

  return productsWithDiscount;
};

const deleteProduct = async (id: string) => {
  return await prisma.product.delete({ where: { id } });
};

export const productsService = {
  createProduct,
  getProducts,
  deleteProduct,
};
