import fastify from "fastify";
import { productsController } from "./src/routes/products/products-controller";
import cors from "@fastify/cors";
import { categoryController } from "./src/routes/category/category-controller";

const app = fastify();

app.register(productsController);
app.register(categoryController);
app.register(cors, { origin: "*" });

await app.listen({ port: 4321 || process.env.PORT, host: "0.0.0.0" });
