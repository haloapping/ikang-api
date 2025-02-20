import { Hono } from "hono";
import { pool } from "../db/db";
import { zValidator } from "@hono/zod-validator";
import { FishHabitat, FishHabitatSchema } from "../types/fish-habitat";
import { randomUUIDv7 } from "bun";

export const fishHabitatRoutes = new Hono();

fishHabitatRoutes.get("/", async (c) => {
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM fishes_habitats`);

    return c.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishHabitatRoutes.get("/:id", async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query(
      `SELECT * FROM fishes_habitats WHERE id=$1;`,
      [id],
    );

    return c.json({ count: result.rowCount, data: result.rows[0] });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishHabitatRoutes.post(
  "/",
  zValidator("json", FishHabitatSchema),
  async (c) => {
    const client = await pool.connect();

    try {
      const fishHabitatJSON: FishHabitat = await c.req.json();
      const result = await client.query(
        `INSERT INTO fishes_habitats(id, fish_id, habitat_id) VALUES($1, $2, $3) RETURNING *;`,
        [randomUUIDv7(), fishHabitatJSON.fishId, fishHabitatJSON.habitatId],
      );

      return c.json(
        { message: "Fishes Habitat added", data: result.rows[0] },
        201,
      );
    } catch (error) {
      return c.json({ error: error }, 400);
    } finally {
      client.release(true);
    }
  },
);

fishHabitatRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const client = await pool.connect();

  try {
    const result = await client.query(
      `DELETE FROM fishes_habitats WHERE id=$1 RETURNING *;`,
      [id],
    );

    return c.json(
      { message: "Fishes Habitat deleted", data: result.rows[0] },
      200,
    );
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});
