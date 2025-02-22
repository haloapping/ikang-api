import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";
import { Hono } from "hono";
import { pool } from "../db/db";
import { Predator, PredatorSchema } from "../types/predator";

export const predatorRoutes = new Hono();

predatorRoutes.get("/", async (c) => {
  const client = await pool.connect();

  try {
    const predators = await client.query(`SELECT * FROM predators;`);

    return c.json({ count: predators.rowCount, data: predators.rows });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

predatorRoutes.get("/search", async (c) => {
  const client = await pool.connect();

  try {
    const q = c.req.query("q") || "";
    const keyword = q.toLowerCase();
    const result = await client.query(
      `SELECT * FROM predators WHERE name ILIKE $1;`,
      [`%${keyword}%`],
    );

    return c.json({ count: result.rowCount, data: result.rows }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

predatorRoutes.get("/:id", async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const predator = await client.query(
      `SELECT * FROM predators WHERE id=$1;`,
      [id],
    );

    return c.json({ count: predator.rowCount, data: predator.rows[0] || null });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

predatorRoutes.post("/", zValidator("json", PredatorSchema), async (c) => {
  const client = await pool.connect();

  try {
    const predatorJSON: Predator = await c.req.json();
    const result = await client.query(`INSERT INTO predators VALUES($1, $2);`, [
      randomUUIDv7(),
      predatorJSON.name,
    ]);

    return c.json({ message: "Predator added", data: result.rows[0] }, 201);
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

predatorRoutes.patch("/:id", zValidator("json", PredatorSchema), async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query(`SELECT id FROM predators WHERE id=$1`, [
      id,
    ]);

    if (result.rowCount === 0) {
      return c.json({ message: "Predator not found", data: null }, 404);
    }

    const predatorJSON: Predator = await c.req.json();
    const updatedResult = await client.query(
      `UPDATE predators SET name=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *;`,
      [predatorJSON.name, id],
    );

    return c.json(
      { message: "Predator is updated", data: updatedResult.rows[0] },
      200,
    );
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

predatorRoutes.delete("/:id", async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query(
      `DELETE FROM fishes_predators AS fd USING predators AS p WHERE fd.predator_id=p.id AND p.id=$1 RETURNING *;`,
      [id],
    );

    if (result.rowCount === 0) {
      return c.json({ message: "Predator not found", data: null }, 404);
    }

    return c.json({ message: "Predator deleted", data: result.rows[0] }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});
