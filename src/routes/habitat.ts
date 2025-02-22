import { Hono } from "hono";
import { pool } from "../db/db";
import { Habitat, HabitatSchema } from "../types/habitat";
import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";

export const habitatRoutes = new Hono();

habitatRoutes.get("/", async (c) => {
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM habitats`);

    return c.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

habitatRoutes.get("/:id", async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query(`SELECT * FROM habitats WHERE id=$1;`, [
      id,
    ]);

    return c.json({ count: result.rowCount, data: result.rows[0] });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

habitatRoutes.post("/", zValidator("json", HabitatSchema), async (c) => {
  const client = await pool.connect();

  try {
    const habitatJSON: Habitat = await c.req.json();
    const result = await client.query(
      `INSERT INTO habitats(id, name) VALUES($1, $2) RETURNING *;`,
      [randomUUIDv7(), habitatJSON.name],
    );

    return c.json({ message: "Habitat added", data: result.rows[0] }, 201);
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

habitatRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const client = await pool.connect();

  try {
    const result = await client.query(
      `DELETE FROM habitats WHERE id=$1 RETURNING *;`,
      [id],
    );

    return c.json({ message: "Habitat deleted", data: result.rows[0] }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});
