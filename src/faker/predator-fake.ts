import { faker } from "@faker-js/faker";
import { randomUUIDv7 } from "bun";
import { pool } from "../db/db";
import { type Predator } from "../types/predator";

export async function generateFakePredator(nPredator: number = 3) {
  let predators = [];
  for (let i = 0; i < nPredator; i++) {
    const predator: Predator = {
      id: randomUUIDv7(),
      name: faker.word.words({ count: { min: 1, max: 3 } }),
    };
    predators.push(predator);
  }

  let query: string = "";
  let values: Array<string | undefined> = [];
  const nColumn: number = 2;
  for (let i = 0; i < nPredator; i++) {
    query = `INSERT INTO predators(id, name)
             VALUES ${predators
               .map(
                 (_, i) =>
                   `($${nColumn * i + 1},
                     $${nColumn * i + 2})`,
               )
               .join(", ")}
               RETURNING *;`;

    values = predators.flatMap((predator) => [predator.id, predator.name]);
  }

  const client = await pool.connect();
  try {
    await client.query(query, values);
  } catch (error) {
    console.log(error);
  } finally {
    client.release(true);
  }
}
