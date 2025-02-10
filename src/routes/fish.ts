import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";
import { Hono } from "hono";
import { fishes } from "../data";
import { type Fish, FishSchema } from "../types/fish";

let dataFishes = fishes;

export const fishRoute = new Hono();

// GET /fishes/search?q=...
fishRoute.get("/search", (c) => {
  const q = c.req.query("q") || "";
  const keyword = q.toLowerCase();

  const foundFishes = dataFishes.filter(
    (fish) =>
      fish.name.toLowerCase().includes(keyword) ||
      fish.scientificName.toLowerCase().includes(keyword) ||
      fish.habitat.toLowerCase().includes(keyword) ||
      fish.size.toLowerCase().includes(keyword) ||
      fish.diet.toLowerCase().includes(keyword) ||
      fish.lifespan.toLowerCase().includes(keyword) ||
      fish.status.toLowerCase().includes(keyword) ||
      fish.color.toLowerCase().includes(keyword) ||
      fish.waterType.toLowerCase().includes(keyword) ||
      fish.status.toLowerCase().includes(keyword) ||
      fish.reproduction.toLowerCase().includes(keyword) ||
      fish.predators.toString().toLowerCase().includes(keyword) ||
      fish.behavior.toLowerCase().includes(keyword)
  );

  return c.json({ count: foundFishes.length, data: foundFishes }, 200);
});

// GET /fishes
fishRoute.get("/", (c) => {
  return c.json({ count: dataFishes.length, data: dataFishes });
});

// GET /fishes/:id
fishRoute.get("/:id", (c) => {
  const id = c.req.param("id");
  const fish = dataFishes.find((fish) => fish.id === id);

  if (!fish) {
    return c.json({ message: "Fish not found", data: null }, 404);
  }

  return c.json({ message: "Fish found", data: fish });
});

// POST /fishes
fishRoute.post("/", zValidator("json", FishSchema), async (c) => {
  const fishJSON: Fish = await c.req.json();

  const newFish = {
    id: randomUUIDv7(),
    ...fishJSON,
    createdAt: new Date(),
    updatedAt: null,
  };

  const updatedFishes = [...dataFishes, newFish];

  dataFishes = updatedFishes;

  return c.json({ message: "Fish added", data: newFish }, 201);
});

// DELETE /fishes/:id
fishRoute.delete("/:id", (c) => {
  const id = c.req.param("id");

  const updatedFishes = dataFishes.filter((fish) => fish.id !== id);

  dataFishes = updatedFishes;

  return c.json({ message: "Fish is deleted" });
});

// PATCH /fishes/:id
fishRoute.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const foundFish = fishes.find((fish) => fish.id === id);

  if (!foundFish) return c.json({ error: "Fish not found" }, 404);

  const updatedFishJSON: Partial<Fish> = await c.req.json();

  const updatedFish = {
    ...foundFish,
    ...updatedFishJSON,
    updatedAt: new Date(),
  };

  const updatedFishes = fishes.map((fish) => {
    if (fish.id === id) {
      return updatedFish;
    }
    return fish;
  });

  dataFishes = updatedFishes;

  return c.json({
    message: "Fish updated",
    data: updatedFish,
  });
});

// PUT /fishes/:id
fishRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const idxFish = fishes.findIndex((fish) => fish.id === id);
  if (idxFish === -1) {
    return c.json({ error: "Fish not found" }, 404);
  }

  const updatedFishJSON: Fish = await c.req.json();
  fishes[idxFish] = {
    ...fishes[idxFish],
    ...updatedFishJSON,
    updatedAt: new Date(),
  };

  return c.json({ message: "Fish is updated", data: fishes[idxFish] }, 200);
});
