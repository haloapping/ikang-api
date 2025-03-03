import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { prisma } from "../../prisma/prisma";
import { type Fish, FishSchema } from "../types/fish";

export const fishRoutes = new Hono();

fishRoutes.get("/", async (c) => {
  try {
    const result = await prisma.fish.findMany({
      include: {
        habitats: true,
        predators: true,
      },
    });

    return c.json({ count: result.length, data: result });
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishRoutes.get("/search", async (c) => {
  try {
    const keyword = c.req.query("q")?.toLowerCase() || "";
    console.log(keyword);

    const result = await prisma.fish.findMany({
      where: {
        OR: [
          { name: { contains: keyword, mode: "insensitive" } },
          { scientificName: { contains: keyword, mode: "insensitive" } },
          { size: { contains: keyword, mode: "insensitive" } },
          { diet: { contains: keyword, mode: "insensitive" } },
          { lifespan: { contains: keyword, mode: "insensitive" } },
          { status: { contains: keyword, mode: "insensitive" } },
          { color: { contains: keyword, mode: "insensitive" } },
          { waterType: { contains: keyword, mode: "insensitive" } },
          { reproduction: { contains: keyword, mode: "insensitive" } },
          { behavior: { contains: keyword, mode: "insensitive" } },
        ],
      },
    });

    return c.json({ count: result.length, data: result }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishRoutes.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const isGetHabitat = c.req.query("habitat");
    const isGetPredator = c.req.query("predator");
    let result;

    if (isGetHabitat === "true" && isGetPredator === "true") {
      result = await prisma.fish.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          habitats: true,
          predators: true,
        },
      });
    } else if (isGetHabitat === "true") {
      result = await prisma.fish.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          habitats: true,
        },
      });
    } else if (isGetPredator === "true") {
      result = await prisma.fish.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          habitats: true,
        },
      });
    } else {
      result = await prisma.fish.findFirstOrThrow({
        where: {
          id: id,
        },
        include: {
          habitats: true,
          predators: true,
        },
      });
    }

    if (!result) {
      return c.json({ message: "Data not found", data: result });
    } else {
      return c.json({ message: "Data is found", data: result });
    }
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishRoutes.post("/", zValidator("json", FishSchema), async (c) => {
  try {
    const fishJSON: Fish = await c.req.json();
    const result = await prisma.fish.create({
      data: {
        name: fishJSON.name,
        scientificName: fishJSON.scientificName,
        size: fishJSON.size,
        diet: fishJSON.diet,
        lifespan: fishJSON.lifespan,
        status: fishJSON.status,
        color: fishJSON.color,
        waterType: fishJSON.waterType,
        reproduction: fishJSON.reproduction,
        behavior: fishJSON.behavior,
      },
    });

    return c.json({ message: "Fish added", data: result }, 201);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishRoutes.patch("/:id", zValidator("json", FishSchema), async (c) => {
  try {
    const id = c.req.param("id");
    const fishJSON = await c.req.json();
    const result = await prisma.fish.update({
      where: {
        id: id,
      },
      data: fishJSON,
    });

    if (!result) {
      return c.json({ message: "Fish not found" }, 404);
    }

    return c.json({ message: "Fish is updated", data: result }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  }
});

fishRoutes.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");

    const result = await prisma.fish.delete({
      where: {
        id: id,
      },
    });

    return c.json({ message: "Fish deleted", data: result }, 200);
  } catch (error) {
    return c.json({ error: error, data: null }, 404);
  }
});
