import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";
import { createFactory } from "hono/factory";
import { fishes } from "../data";
import { type Fish, FishSchema } from "../types/fish";

const factory = createFactory();

const getAllFishesHandler = factory.createHandlers((c) => {
  return c.json({ numberOfData: fishes.length, data: fishes });
});

const searchFishHandler = factory.createHandlers(async (c) => {
  const q = c.req.query("q") || "";

  const foundFishes = fishes.filter(
    (fish) =>
      fish.name.toLowerCase().includes(q.toLowerCase()) ||
      fish.scientificName.toLowerCase().includes(q.toLowerCase()) ||
      fish.habitat.toLowerCase().includes(q.toLowerCase()) ||
      fish.size.toLowerCase().includes(q.toLowerCase()) ||
      fish.diet.toLowerCase().includes(q.toLowerCase()) ||
      fish.lifespan.toLowerCase().includes(q.toLowerCase()) ||
      fish.status.toLowerCase().includes(q.toLowerCase()) ||
      fish.color.toLowerCase().includes(q.toLowerCase()) ||
      fish.waterType.toLowerCase().includes(q.toLowerCase()) ||
      fish.status.toLowerCase().includes(q.toLowerCase()) ||
      fish.reproduction.toLowerCase().includes(q.toLowerCase()) ||
      fish.predators.toString().toLowerCase().includes(q.toLowerCase()) ||
      fish.behavior.toLowerCase().includes(q.toLowerCase())
  );

  return c.json({ numberOfData: foundFishes.length, data: foundFishes }, 200);
});

const getByIdFishHandler = factory.createHandlers((c) => {
  const id = c.req.param("id");
  const fish = fishes.find((fish) => fish.id === id);
  if (!fish) {
    return c.json({ message: "Fish not found", data: null }, 404);
  }

  return c.json({ message: "Fish found", data: fish });
});

const addNewFishHandler = factory.createHandlers(zValidator("json", FishSchema), async (c) => {
  const fishJSON: Fish = await c.req.json();
  fishes.push({
    id: randomUUIDv7(),
    ...fishJSON,
    createdAt: new Date(),
    updatedAt: null,
  });

  return c.json({ message: "Fish added" }, 201);
});

const putFishHandler = factory.createHandlers(async (c) => {
  const id = c.req.param("id");
  const idxFish = fishes.findIndex((fish) => fish.id === id);

  if (idxFish === -1) {
    return c.json({ error: "Fish not found" }, 404);
  }

  const updatedFishJSON: Fish = await c.req.json();
  fishes[idxFish] = {
    id,
    createdAt: fishes[idxFish].createdAt,
    updatedAt: new Date(),
    ...updatedFishJSON,
  };

  return c.json({ message: "Fish updated", data: fishes[idxFish] }, 200);
});

const patchFishHandler = factory.createHandlers(async (c) => {
  const id = c.req.param("id");
  const idxFish = fishes.findIndex((fish) => fish.id === id);
  if (idxFish === -1) {
    return c.json({ error: "Fish not found" }, 404);
  }

  const updatedFishJSON: Fish = await c.req.json();
  fishes[idxFish] = { ...fishes[idxFish], ...updatedFishJSON, updatedAt: new Date() };

  return c.json({ message: "Fish is updated", data: fishes[idxFish] }, 200);
});

const deleteFishHandler = factory.createHandlers((c) => {
  const id = c.req.param("id");
  const idxFish = fishes.findIndex((fish) => fish.id === id);

  if (idxFish === -1) {
    return c.json({ error: "Fish not found" }, 404);
  }

  fishes.splice(idxFish, 1);

  return c.json({ message: "Fish is deleted" });
});

export {
  addNewFishHandler,
  deleteFishHandler,
  getAllFishesHandler,
  getByIdFishHandler,
  patchFishHandler,
  putFishHandler,
  searchFishHandler,
};
