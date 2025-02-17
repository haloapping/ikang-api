import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { pool } from "../db/db";
import { FishPredator, FishPredatorSchema } from "../types/fish-predator";
import { randomUUIDv7 } from "bun";

export const fishPredatorRoutes = new Hono();

fishPredatorRoutes.get("/", async (c) => {
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM fishes_predators;`);

    return c.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishPredatorRoutes.post(
  "/",
  zValidator("json", FishPredatorSchema),
  async (c) => {
    const client = await pool.connect();

    const fishPredatorJSON: FishPredator = await c.req.json();
    try {
      const result = await client.query(
        `INSERT INTO fishes_predators(id, fish_id, predator_id) VALUES($1, $2, $3) RETURNING *`,
        [randomUUIDv7(), fishPredatorJSON.fishId, fishPredatorJSON.predatorId],
      );

      return c.json({ message: "Data added", data: result.rows[0] }, 201);
    } catch (error) {
      return c.json({ message: error, data: null }, 400);
    } finally {
      client.release(true);
    }
  },
);
