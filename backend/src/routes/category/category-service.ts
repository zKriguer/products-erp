import { prisma } from "../../PrismaService";

const getCategories = async () => {
  return await prisma.discounts.findMany();
};

export const categoryService = {
  getCategories,
};
