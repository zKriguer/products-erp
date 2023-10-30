import type { FastifyInstance } from "fastify";
import { productsService } from "./products-service";

import { z } from "zod";
import { randomUUID } from "crypto";

const productDTO = z.object({
  name: z.string(),
  price: z.number(),
  color: z.string(),
  category: z.enum([
    "smartphones",
    "furniture",
    "electronics",
    "appliances",
    "refrigerators",
  ]),
  description: z.string(),
});

const productId = z.object({
  id: z.string().uuid(),
});

export const productsController = async (app: FastifyInstance) => {
  app.post("/products", async (req, res) => {
    try {
      const product = productDTO.parse(req.body);
      await productsService.createProduct({ id: randomUUID(), ...product });
      return res.status(201).send();
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).send({
          error: error.issues.map((issue) => ({
            message: issue.message,
            path: issue.path[0],
          })),
        });
      }
      return res.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.get("/products", async (req, res) => {
    try {
      const data = await productsService.getProducts();
      return res.status(200).send(data);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal Server Error" });
    }
  });

  app.delete("/products/:id", async (req, res) => {
    try {
      const { id } = productId.parse(req.params);
      await productsService.deleteProduct(id);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).send({
          error: error.issues.map((issue) => ({
            message: issue.message,
            path: issue.path[0],
          })),
        });
      }
      return res.status(500).send({ error: "Internal Server Error" });
    }
  });
};
