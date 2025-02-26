import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { ulid } from "ulid";
import { Habitat, HabitatSchema } from "../types/habitat";
import { Predator } from "../types/predator";

export const habitatRoutes = new Hono();
const prisma = new PrismaClient();

habitatRoutes.get("/", async (c) => {
  try {
    const result = await prisma.habitat.findMany();

    return c.json({ count: result.length, data: result });
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

habitatRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await prisma.habitat.findFirstOrThrow({
      where: {
        id: id,
      },
    });

    if (!result) {
      return c.json({ message: "Data not found", data: result });
    } else {
      return c.json({ message: "Data is found", data: result });
    }
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

habitatRoutes.post("/", zValidator("json", HabitatSchema), async (c) => {
  try {
    const habitatJSON: Habitat = await c.req.json();
    const result = await prisma.habitat.create({
      data: {
        id: ulid(),
        name: habitatJSON.name,
      },
    });

    return c.json({ message: "Predator added", data: result }, 201);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

habitatRoutes.patch("/:id", zValidator("json", HabitatSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const predatorJSON: Predator = await c.req.json();
    prisma.habitat.update({
      where: {
        id: id,
      },
      data: {
        id: ulid(),
        name: predatorJSON.name,
      },
    });
  } catch (error) {}
});

habitatRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const result = await prisma.habitat.delete({
      where: {
        id: id,
      },
    });

    return c.json({ message: "Habitat deleted", data: result }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});
