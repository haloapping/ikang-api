import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { pool } from "../db";
import { FishPredator, FishPredatorSchema } from "../types/fish-predator";
import { randomUUIDv7 } from "bun";

export const fishPredatorRoutes = new Hono();

fishPredatorRoutes.get("/", async (c) => {
  const result = await pool.query(`SELECT * FROM fishes_predators;`);

  return c.json({ count: result.rowCount, data: result.rows });
});

fishPredatorRoutes.post(
  "/",
  zValidator("json", FishPredatorSchema),
  async (c) => {
    const fishPredatorJSON: FishPredator = await c.req.json();

    try {
      const result = await pool.query(
        `INSERT INTO fishes_predators(id, fish_id, predator_id) VALUES($1, $2, $3)`,
        [randomUUIDv7(), fishPredatorJSON.fishId, fishPredatorJSON.predatorId],
      );

      return c.json({ message: "Data added", data: result.rows[0] }, 201);
    } catch (error) {
      return c.json({ message: error, data: null }, 404);
    }
  },
);
