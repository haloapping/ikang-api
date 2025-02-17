import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";
import { Hono } from "hono";
import { pool } from "../db/db";
import { type Fish, FishSchema } from "../types/fish";

export const fishRoutes = new Hono();

fishRoutes.get("/", async (c) => {
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM fishes`);

    return c.json({ count: result.rowCount, data: result.rows });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishRoutes.get("/search", async (c) => {
  const client = await pool.connect();

  try {
    const q = c.req.query("q") || "";
    const keyword = q.toLowerCase();
    const result = await client.query(
      `SELECT * FROM fishes
     WHERE name ILIKE $1 OR
           scientific_name ILIKE $2 OR
           size ILIKE $3 OR
           diet ILIKE $4 OR
           lifespan ILIKE $5 OR
           status ILIKE $6 OR
           color ILIKE $7 OR
           water_type ILIKE $8 OR
           reproduction ILIKE $9 OR
           behavior ILIKE $10;`,
      [
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
        `%${keyword}%`,
      ],
    );

    return c.json({ count: result.rowCount, data: result.rows }, 200);
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishRoutes.get("/:id", async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query("SELECT * FROM fishes WHERE id=$1;", [
      id,
    ]);

    return c.json({ count: result.rowCount, data: result.rows[0] });
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishRoutes.post("/", zValidator("json", FishSchema), async (c) => {
  const client = await pool.connect();

  try {
    const fishJSON: Fish = await c.req.json();
    const result = await client.query(
      `INSERT INTO fishes(id, name, scientific_name, habitat, size, diet, lifespan, status, color, water_type, reproduction, behavior)
     VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *;`,
      [
        randomUUIDv7(),
        fishJSON.name,
        fishJSON.scientificName,
        fishJSON.habitat,
        fishJSON.size,
        fishJSON.diet,
        fishJSON.lifespan,
        fishJSON.status,
        fishJSON.color,
        fishJSON.waterType,
        fishJSON.reproduction,
        fishJSON.behavior,
      ],
    );

    return c.json({ message: "Fish added", data: result.rows[0] }, 201);
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishRoutes.put("/:id", zValidator("json", FishSchema), async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query(`SELECT id FROM fishes WHERE id=$1;`, [
      id,
    ]);

    const updatedFishJSON: Fish = await c.req.json();
    if (result.rowCount === 0) {
      const newFish = {
        id: randomUUIDv7(),
        ...updatedFishJSON,
        createdAt: new Date(),
        updatedAt: null,
      };

      const result = await pool.query(
        `INSERT INTO fishes(id, name, scientific_name, habitat, size, diet, lifespan, status, color, water_type, reproduction, behavior)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *;`,
        [
          randomUUIDv7(),
          newFish.name,
          newFish.scientificName,
          newFish.habitat,
          newFish.size,
          newFish.diet,
          newFish.lifespan,
          newFish.status,
          newFish.color,
          newFish.waterType,
          newFish.reproduction,
          newFish.behavior,
        ],
      );

      return c.json(
        {
          message: "Fish not found, added fish data",
          data: result.rows[0],
        },
        200,
      );
    }

    const updatedResult = await client.query(
      `UPDATE fishes
       SET
        name=$1,
        scientific_name=$2,
        habitat=$3,
        size=$4,
        diet=$5,
        lifespan=$6,
        status=$7,
        color=$8,
        water_type=$9,
        reproduction=$10,
        behavior=$11,
        created_at=$12,
        updated_at=$13
       WHERE id=$14
       RETURNING *;`,
      [
        updatedFishJSON.name,
        updatedFishJSON.scientificName,
        updatedFishJSON.habitat,
        updatedFishJSON.size,
        updatedFishJSON.diet,
        updatedFishJSON.lifespan,
        updatedFishJSON.status,
        updatedFishJSON.color,
        updatedFishJSON.waterType,
        updatedFishJSON.reproduction,
        updatedFishJSON.behavior,
        result.rows[0][12],
        new Date(),
        id,
      ],
    );

    return c.json(
      { message: "Fish updated", data: updatedResult.rows[0] },
      200,
    );
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishRoutes.patch("/:id", zValidator("json", FishSchema), async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query("SELECT id FROM fishes WHERE id=$1;", [
      id,
    ]);

    if (result.rowCount === 0) {
      return c.json({ message: "Fish not found" }, 404);
    }

    let query = `UPDATE fishes SET `;
    let values: any[] = [];
    let count: number = 1;

    const fishDataJSON: Fish = await c.req.json();
    for (const [key, value] of Object.entries(fishDataJSON)) {
      query += `${key}=$${count}, `;
      values.push(value);
      count++;
    }

    query =
      query.slice(0, -2) +
      `, updated_at=CURRENT_TIMESTAMP WHERE id=$${count} RETURNING *;`;
    values.push(id);

    const updatedResult = await client.query(query, values);

    return c.json(
      { message: "Fish is updated", data: updatedResult.rows[0] },
      200,
    );
  } catch (error) {
    return c.json({ error: error }, 400);
  } finally {
    client.release(true);
  }
});

fishRoutes.delete("/:id", async (c) => {
  const client = await pool.connect();

  try {
    const id = c.req.param("id");
    const result = await client.query(
      `DELETE FROM fishes_predators AS fd USING fishes AS f WHERE fd.fish_id = f.id AND f.id=$1 RETURNING *;`,
      [id],
    );

    if (result.rowCount === 0) {
      return c.json({ message: "Fish not found", data: null }, 404);
    }

    return c.json({ message: "Fish deleted", data: result.rows[0] }, 200);
  } catch (error) {
    return c.json({ error: "Cannot delete: referenced by other records" }, 409);
  } finally {
    client.release(true);
  }
});
