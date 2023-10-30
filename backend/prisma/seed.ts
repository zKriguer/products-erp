import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { randomUUID } from "node:crypto";

await prisma.discounts.createMany({
  data: [
    { id: randomUUID(), productType: "smartphones", value: 2.55 },
    { id: randomUUID(), productType: "furniture", value: 3 },
    { id: randomUUID(), productType: "electronics", value: 4.3 },
    { id: randomUUID(), productType: "appliances", value: 5 },
    { id: randomUUID(), productType: "refrigerators", value: 7.5 },
  ],
});
