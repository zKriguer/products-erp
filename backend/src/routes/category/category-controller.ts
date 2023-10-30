import type { FastifyInstance } from "fastify";
import { categoryService } from "./category-service";

export const categoryController = async (app: FastifyInstance) => {
  app.get("/categories", async (req, res) => {
    try {
      const data = await categoryService.getCategories();
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  });
};
