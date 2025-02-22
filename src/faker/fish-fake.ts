import { faker } from "@faker-js/faker";
import { randomUUIDv7 } from "bun";
import { pool } from "../db/db";
import { type Fish } from "../types/fish";

export async function generateFakeFish(nFish: number = 3) {
  let fishes = [];
  for (let i = 0; i < nFish; i++) {
    const fish: Fish = {
      id: randomUUIDv7(),
      name: faker.word.words({ count: { min: 1, max: 3 } }),
      scientificName: faker.word.words({ count: { min: 1, max: 3 } }),
      size: faker.word.words(2),
      diet: ["Yes", "No"][Math.floor(Math.random() * 2)],
      lifespan: faker.word.words({ count: { min: 2, max: 3 } }),
      status: ["Oke", "Not Oke"][Math.floor(Math.random() * 2)],
      color: faker.color.human(),
      waterType: faker.word.words({ count: { min: 2, max: 5 } }),
      reproduction: faker.word.words({ count: { min: 2, max: 5 } }),
      behavior: faker.word.words({ count: { min: 2, max: 5 } }),
    };
    fishes.push(fish);
  }

  let query: string = "";
  let values: Array<string | undefined> = [];
  const nColumn: number = 11;

  for (let i = 0; i < nFish; i++) {
    query = `INSERT INTO fishes(id, name, scientific_name, size, diet, lifespan, status, color, water_type, reproduction, behavior)
             VALUES ${fishes
               .map(
                 (_, i) =>
                   `($${nColumn * i + 1},
                     $${nColumn * i + 2},
                     $${nColumn * i + 3},
                     $${nColumn * i + 4},
                     $${nColumn * i + 5},
                     $${nColumn * i + 6},
                     $${nColumn * i + 7},
                     $${nColumn * i + 8},
                     $${nColumn * i + 9},
                     $${nColumn * i + 10},
                     $${nColumn * i + 11})`,
               )
               .join(", ")}
               RETURNING *;`;

    values = fishes.flatMap((fish) => [
      fish.id,
      fish.name,
      fish.scientificName,
      fish.size,
      fish.diet,
      fish.lifespan,
      fish.status,
      fish.color,
      fish.waterType,
      fish.reproduction,
      fish.behavior,
    ]);
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
