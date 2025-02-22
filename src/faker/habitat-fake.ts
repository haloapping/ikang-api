import { randomUUIDv7 } from "bun";
import { pool } from "../db/db";
import { type Habitat } from "../types/habitat";

export async function generateFakeHabitat() {
  const habitats: Habitat[] = [
    { id: randomUUIDv7(), name: "Lake" },
    { id: randomUUIDv7(), name: "Freshwater" },
    { id: randomUUIDv7(), name: "Saltwater" },
    { id: randomUUIDv7(), name: "Brackish" },
    { id: randomUUIDv7(), name: "River" },
    { id: randomUUIDv7(), name: "Deep Sea" },
    { id: randomUUIDv7(), name: "Reef" },
    { id: randomUUIDv7(), name: "Open Ocean" },
  ];

  let query: string = "";
  let values: Array<string | undefined> = [];
  const nColumn: number = 2;

  for (let i = 0; i < habitats.length; i++) {
    query = `INSERT INTO habitats(id, name)
             VALUES ${habitats
               .map(
                 (_, i) =>
                   `($${nColumn * i + 1},
                     $${nColumn * i + 2})`,
               )
               .join(", ")}
               RETURNING *;`;

    values = habitats.flatMap((habitat) => [habitat.id, habitat.name]);
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
