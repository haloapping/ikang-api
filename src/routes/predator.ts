import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { ulid } from "ulid";
import { Predator, PredatorSchema } from "../types/predator";

export const predatorRoutes = new Hono();
const prisma = new PrismaClient();

predatorRoutes.get("/", async (c) => {
  try {
    const result = await prisma.predator.findMany();

    return c.json({ count: result.length, data: result });
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

predatorRoutes.get("/search", async (c) => {
  try {
    const q = c.req.query("q")?.toLowerCase() || "";
    const result = await prisma.predator.findMany({
      where: {
        OR: [{ name: { contains: q, mode: "insensitive" } }],
      },
    });

    return c.json({ count: result.length, data: result }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

predatorRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const predator = await prisma.predator.findFirstOrThrow({
      where: {
        id: id,
      },
    });

    if (!predator) {
      return c.json({ message: "Data not found", data: predator });
    } else {
      return c.json({ message: "Data is found", data: predator });
    }
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

predatorRoutes.post("/", zValidator("json", PredatorSchema), async (c) => {
  try {
    const predatorJSON: Predator = await c.req.json();
    const result = await prisma.predator.create({
      data: {
        id: ulid(),
        name: predatorJSON.name,
      },
    });

    return c.json({ message: "Predator added", data: result }, 201);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

predatorRoutes.patch("/:id", zValidator("json", PredatorSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const predatorJSON: Predator = await c.req.json();
    const result = await prisma.predator.update({
      where: {
        id: id,
      },
      data: predatorJSON,
    });

    if (!result) {
      return c.json({ message: "Predator not found", data: null }, 404);
    }

    return c.json({ message: "Predator is updated", data: result }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

predatorRoutes.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await prisma.predator.delete({
      where: {
        id: id,
      },
    });

    if (!result) {
      return c.json({ message: "Predator not found", data: null }, 404);
    }

    return c.json({ message: "Predator deleted", data: result }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});
