import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { FishPredator, FishPredatorSchema } from "../types/fish-predator";

export const fishPredatorRoutes = new Hono();
const prisma = new PrismaClient();

fishPredatorRoutes.get("/", async (c) => {
  try {
    const result = await prisma.fishPredator.findMany();

    return c.json({ count: result.length, data: result });
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishPredatorRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await prisma.fishPredator.findFirstOrThrow({
      where: {
        id: id,
      },
    });

    if (!result) {
      return c.json({ message: "Data not found", data: null });
    }

    return c.json({ message: "Data found", data: result });
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishPredatorRoutes.post(
  "/",
  zValidator("json", FishPredatorSchema),
  async (c) => {
    const fishPredatorJSON: FishPredator = await c.req.json();
    try {
      const result = prisma.fishPredator.create({ data: fishPredatorJSON });

      return c.json({ message: "Data added", data: result }, 201);
    } catch (error) {
      return c.json({ message: error, data: null }, 400);
    }
  },
);
