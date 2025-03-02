import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../prisma/prisma";
import { type Habitat, HabitatSchema } from "../types/habitat";

export const habitatRoutes = new Hono();

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
    const habitatJSON: Habitat = await c.req.json();
    prisma.habitat.update({
      where: {
        id: id,
      },
      data: {
        name: habitatJSON.name,
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
