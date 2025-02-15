import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { pool } from "../db";
import { Predator, PredatorSchema } from "../types/predator";
import { randomUUIDv7 } from "bun";

export const predatorRoutes = new Hono();

predatorRoutes.get("/", async (c) => {
  const predators = await pool.query(`SELECT * FROM predators;`);

  return c.json({ count: predators.rowCount, data: predators.rows });
});

predatorRoutes.get("/search", async (c) => {
  const q = c.req.query("q") || "";
  const keyword = q.toLowerCase();
  const result = await pool.query(
    `SELECT * FROM predators WHERE name ILIKE $1;`,
    [`%${keyword}%`],
  );

  return c.json({ count: result.rowCount, data: result.rows }, 200);
});

predatorRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const predator = await pool.query(`SELECT * FROM predators WHERE id=$1;`, [
    id,
  ]);

  return c.json({ count: predator.rowCount, data: predator.rows[0] || null });
});

predatorRoutes.post("/", zValidator("json", PredatorSchema), async (c) => {
  const predatorJSON: Predator = await c.req.json();
  const result = await pool.query(`INSERT INTO predators VALUES($1, $2);`, [
    randomUUIDv7(),
    predatorJSON.name,
  ]);

  return c.json({ message: "Predator added", data: result.rows[0] }, 201);
});

predatorRoutes.patch("/:id", zValidator("json", PredatorSchema), async (c) => {
  const id = c.req.param("id");
  const result = await pool.query(`SELECT id FROM predators WHERE id=$1`, [id]);
  if (result.rowCount === 0) {
    return c.json({ message: "Predator not found", data: null }, 404);
  }

  const predatorJSON: Predator = await c.req.json();
  const updatedResult = await pool.query(
    `UPDATE predators SET name=$1, updated_at=CURRENT_TIMESTAMP WHERE id=$2 RETURNING *;`,
    [predatorJSON.name, id],
  );

  return c.json(
    { message: "Predator is updated", data: updatedResult.rows[0] },
    200,
  );
});

predatorRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await pool.query(
    `DELETE FROM predators WHERE id=$1 RETURNING *;`,
    [id],
  );

  if (result.rowCount === 0) {
    return c.json({ message: "Predator not found", data: null }, 404);
  }

  return c.json({ message: "Predator deleted", data: result.rows[0] }, 200);
});
