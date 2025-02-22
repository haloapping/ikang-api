import { randomUUIDv7 } from "bun";
import { pool } from "../db/db";
import { type FishPredator } from "../types/fish-predator";

export async function generateFakeFishPredator(nFishPredator: number = 3) {
  const client = await pool.connect();

  try {
    const fishResult = client.query(`SELECT id FROM fishes`);
    const predatorResult = client.query(`SELECT id FROM predators`);

    const fishIds = (await fishResult).rows.flat();
    const predatorIds = (await predatorResult).rows.flat();
    const nFishId = fishIds.length;
    const nPredatorId = predatorIds.length;

    const fishesPredators = [];
    for (let i = 0; i < nFishPredator; i++) {
      const fishPredator: FishPredator = {
        id: randomUUIDv7(),
        fishId: fishIds[Math.floor(Math.random() * nFishId)].id,
        predatorId: predatorIds[Math.floor(Math.random() * nPredatorId)].id,
      };
      fishesPredators.push(fishPredator);
    }

    let query: string = "";
    let values: Array<string | undefined> = [];
    const nColumn = 3;
    for (let i = 0; i < nFishPredator; i++) {
      query = `INSERT INTO fishes_predators(id, fish_id, predator_id)
             VALUES ${fishesPredators
               .map(
                 (_, i) =>
                   `($${nColumn * i + 1},
                     $${nColumn * i + 2},
                     $${nColumn * i + 3})`,
               )
               .join(", ")}
               RETURNING *;`;
    }
    values = fishesPredators.flatMap((fishPredator) => [
      fishPredator.id,
      fishPredator.fishId,
      fishPredator.predatorId,
    ]);

    await pool.query(query, values);
  } catch (error) {
    console.log(error);
  } finally {
    client.release(true);
  }
}
