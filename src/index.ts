import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { fishes } from "./data";
import { Fish, FishSchema } from "./types";

const app = new Hono();
app.use(logger());

app.get("/fishes/search", async (c) => {
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
      fish.behavior.toLowerCase().includes(q.toLowerCase())
  );

  return c.json({ numberOfData: foundFishes.length, data: foundFishes }, 200);
});

app.get("/fishes", (c) => {
  return c.json({ numberOfData: fishes.length, data: fishes });
});

app.get("/fishes/:id", (c) => {
  const id = c.req.param("id");
  const fish = fishes.find((fish) => fish.id === id);
  if (!fish) {
    return c.json({ message: "Fish not found" }, 404);
  }

  return c.json({ data: fish });
});

app.post("/fishes", zValidator("json", FishSchema), async (c) => {
  const fishJSON: Fish = await c.req.json();
  const newFish: Fish = {
    id: randomUUIDv7(),
    name: fishJSON.name,
    scientificName: fishJSON.scientificName,
    habitat: fishJSON.habitat,
    size: fishJSON.size,
    diet: fishJSON.diet,
    lifespan: fishJSON.lifespan,
    status: fishJSON.status,
    color: fishJSON.color,
    waterType: fishJSON.waterType,
    reproduction: fishJSON.reproduction,
    predators: fishJSON.predators,
    behavior: fishJSON.behavior,
    createdAt: new Date(),
    updatedAt: null,
  };
  fishes.push(newFish);

  return c.json({ message: "Fish added" }, 201);
});

app.put("/fishes/:id", async (c) => {
  const id = c.req.param("id");
  const fish = fishes.find((fish) => fish.id === id);
  if (!fish) {
    return c.json({ error: "Fish not found" }, 404);
  }

  const fishJSON: Fish = await c.req.json();
  const updatedFish: Fish = {
    id: id,
    name: fishJSON.name,
    scientificName: fishJSON.scientificName,
    habitat: fishJSON.habitat,
    size: fishJSON.size,
    diet: fishJSON.diet,
    lifespan: fishJSON.lifespan,
    status: fishJSON.status,
    color: fishJSON.color,
    waterType: fishJSON.waterType,
    reproduction: fishJSON.reproduction,
    predators: fishJSON.predators,
    behavior: fishJSON.behavior,
    createdAt: fishJSON.createdAt,
    updatedAt: new Date(),
  };

  for (let i = 0; i < fishes.length; i++) {
    if (fishes[i].id === id) {
      fishes[i] = updatedFish;
    }
  }

  return c.json({ message: "Fish updated" }, 200);
});

app.patch("/fishes/:id", async (c) => {
  const id = c.req.param("id");
  const fish = fishes.find((fish) => fish.id === id);
  if (!fish) {
    return c.json({ error: "Fish not found" }, 404);
  }

  const fishJSON: Fish = await c.req.json();
  const updatedFish: Fish = {
    id: id,
    name: fishJSON.name,
    scientificName: fishJSON.scientificName,
    habitat: fishJSON.habitat,
    size: fishJSON.size,
    diet: fishJSON.diet,
    lifespan: fishJSON.lifespan,
    status: fishJSON.status,
    color: fishJSON.color,
    waterType: fishJSON.waterType,
    reproduction: fishJSON.reproduction,
    predators: fishJSON.predators,
    behavior: fishJSON.behavior,
    createdAt: fishJSON.createdAt,
    updatedAt: new Date(),
  };

  for (let i = 0; i < fishes.length; i++) {
    if (fishes[i].id === id) {
      fishes[i] = updatedFish;
    }
  }

  return c.json({ message: "Fish is updated" }, 200);
});

app.delete("fishes/:id", (c) => {
  const id = c.req.param("id");
  const fish = fishes.find((fish) => fish.id === id);

  if (!fish) {
    return c.json({ error: "Fish not found" }, 404);
  }

  for (let i = 0; i < fishes.length; i++) {
    if (fishes[i].id === id) {
      fishes.splice(i, 1);
    }
  }

  return c.json({ message: "Fish is deleted" });
});

export default app;
