import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { pool } from "../db/db";
import { FishHabitat, FishHabitatSchema } from "../types/fish-habitat";

export const fishHabitatRoutes = new Hono();
const prisma = new PrismaClient();

fishHabitatRoutes.get("/", async (c) => {
  try {
    const result = await prisma.fishPredator.findMany();

    return c.json({ count: result.length, data: result });
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishHabitatRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await prisma.fishHabitat.findFirstOrThrow({
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

fishHabitatRoutes.post(
  "/",
  zValidator("json", FishHabitatSchema),
  async (c) => {
    try {
      const fishHabitatJSON: FishHabitat = await c.req.json();
      const result = await prisma.fishHabitat.create({
        data: fishHabitatJSON,
      });

      return c.json({ message: "Fishes Habitat added", data: result }, 201);
    } catch (error) {
      return c.json({ error: error }, 400);
    }
  },
);
