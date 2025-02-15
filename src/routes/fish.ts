import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";
import { Hono } from "hono";
import { fishes } from "../data";
import { type Fish, FishSchema } from "../types/fish";

export const fishRoutes = new Hono();

fishRoutes.get("/", (c) => {
  return c.json({ count: fishes.length, data: fishes });
});

fishRoutes.get("/search", (c) => {
  const q = c.req.query("q") || "";
  const keyword = q.toLowerCase();
  const foundFishes = fishes.filter(
    (fish) =>
      fish.name?.toLowerCase().includes(keyword) ||
      fish.scientificName?.toLowerCase().includes(keyword) ||
      fish.habitat?.toLowerCase().includes(keyword) ||
      fish.size?.toLowerCase().includes(keyword) ||
      fish.diet?.toLowerCase().includes(keyword) ||
      fish.lifespan?.toLowerCase().includes(keyword) ||
      fish.status?.toLowerCase().includes(keyword) ||
      fish.color?.toLowerCase().includes(keyword) ||
      fish.waterType?.toLowerCase().includes(keyword) ||
      fish.status?.toLowerCase().includes(keyword) ||
      fish.reproduction?.toLowerCase().includes(keyword) ||
      fish.predators?.toString().toLowerCase().includes(keyword) ||
      fish.behavior?.toLowerCase().includes(keyword),
  );

  return c.json({ count: foundFishes.length, data: foundFishes }, 200);
});

fishRoutes.get("/:id", (c) => {
  const id = c.req.param("id");
  const fish = fishes.find((fish) => fish.id === id);
  if (!fish) {
    return c.json({ message: "Fish not found", data: null }, 404);
  }

  return c.json({ message: "Fish found", data: fish });
});

fishRoutes.post("/", zValidator("json", FishSchema), async (c) => {
  const fishJSON: Fish = await c.req.json();
  const newFish = {
    id: randomUUIDv7(),
    ...fishJSON,
    createdAt: new Date(),
    updatedAt: null,
  };
  fishes.push(newFish);

  return c.json({ message: "Fish added", data: newFish }, 201);
});

fishRoutes.put("/:id", zValidator("json", FishSchema), async (c) => {
  const id = c.req.param("id");
  const idxFish = fishes.findIndex((fish) => fish.id === id);
  const updatedFishJSON: Fish = await c.req.json();
  if (idxFish === -1) {
    fishes.push({
      id: id,
      ...updatedFishJSON,
      createdAt: new Date(),
      updatedAt: null,
    });

    return c.json(
      {
        message: "Fish not found, added fish",
        data: fishes[fishes.length - 1],
      },
      200,
    );
  }

  fishes[idxFish] = {
    id,
    ...updatedFishJSON,
    createdAt: fishes[idxFish].createdAt,
    updatedAt: new Date(),
  };

  return c.json({ message: "Fish updated", data: fishes[idxFish] }, 200);
});

fishRoutes.patch("/:id", zValidator("json", FishSchema), async (c) => {
  const id = c.req.param("id");
  const idxFish = fishes.findIndex((fish) => fish.id === id);
  if (idxFish === -1) {
    return c.json({ message: "Fish not found" }, 404);
  }

  const updatedFishJSON: Fish = await c.req.json();
  fishes[idxFish] = {
    ...fishes[idxFish],
    ...updatedFishJSON,
    updatedAt: new Date(),
  };

  return c.json({ message: "Fish is updated", data: fishes[idxFish] }, 200);
});

fishRoutes.delete("/:id", (c) => {
  const id = c.req.param("id");
  const idxFish = fishes.findIndex((fish) => fish.id === id);

  if (idxFish === -1) {
    return c.json({ message: "Fish not found" }, 404);
  }

  fishes.splice(idxFish, 1);

  return c.json({ message: "Fish is deleted" });
});
