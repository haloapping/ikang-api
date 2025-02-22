import { zValidator } from "@hono/zod-validator";
import { randomUUIDv7 } from "bun";
import { Hono } from "hono";
import { pool } from "../db/db";
import { type Fish, FishSchema } from "../types/fish";

export const fishRoutes = new Hono();

fishRoutes.get("/", async (c) => {
  const client = await pool.connect();

  try {
    const result = await client.query(`SELECT * FROM fishes;`);

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
    const fishResult = await client.query(`SELECT * FROM fishes WHERE id=$1;`, [
      id,
    ]);

    const isGetHabitat = c.req.query("habitat");
    let habitats = [];
    if (isGetHabitat === "true") {
      const habitatResult = await client.query(
        `SELECT h.name FROM fishes_habitats AS fh 
         INNER JOIN fishes AS f ON fh.fish_id = f.id
         INNER JOIN habitats AS h ON fh.habitat_id = h.id
         WHERE f.id = $1;`,
        [id],
      );
      const habitatRows = habitatResult.rows;
      for (let i = 0; i < habitatRows.length; i++) {
        habitats.push(habitatRows[i].name);
      }
    }

    const isGetPredator = c.req.query("predator");
    let predators = [];
    if (isGetPredator === "true") {
      const predatorResult = await client.query(
        `SELECT p.name FROM fishes_predators AS fd
         INNER JOIN fishes AS f ON fd.fish_id = f.id
         INNER JOIN predators AS p ON fd.predator_id = p.id
         WHERE f.id = $1;`,
        [id],
      );
      const predatorRows = predatorResult.rows;
      for (let i = 0; i < predatorRows.length; i++) {
        predators.push(predatorRows[i].name);
      }
    }

    if (isGetHabitat === "true" && isGetPredator === "true") {
      const data = {
        ...fishResult.rows[0],
        habitats: habitats,
        predators: predators,
      };

      return c.json({ count: fishResult.rowCount, data: data });
    } else if (isGetHabitat === "true") {
      const data = {
        ...fishResult.rows[0],
        habitats: habitats,
      };

      return c.json({ count: fishResult.rowCount, data: data });
    } else if (isGetPredator === "true") {
      const data = {
        ...fishResult.rows[0],
        predators: predators,
      };

      return c.json({ count: fishResult.rowCount, data: data });
    } else {
      return c.json({ count: fishResult.rowCount, data: fishResult.rows[0] });
    }
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
      `INSERT INTO fishes(id, name, scientific_name, size, diet, lifespan, status, color, water_type, reproduction, behavior)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *;`,
      [
        randomUUIDv7(),
        fishJSON.name,
        fishJSON.scientificName,
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
    const result = await client.query(`SELECT id FROM fishes WHERE id=$1;`, [
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

    const deleteFishResult = await client.query(
      `DELETE FROM fishes WHERE id=$1 RETURNING *;`,
      [id],
    );

    if (deleteFishResult.rowCount === 0) {
      return c.json({ message: "Fish not found", data: null }, 404);
    }

    return c.json(
      { message: "Fish deleted", data: deleteFishResult.rows[0] },
      200,
    );
  } catch (error) {
    return c.json({ error: error }, 409);
  } finally {
    client.release(true);
  }
});
