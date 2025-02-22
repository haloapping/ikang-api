import { randomUUIDv7 } from "bun";
import { pool } from "../db/db";
import { type FishHabitat } from "../types/fish-habitat";

export async function generateFakeFishHabitat(nFishHabitat: number = 3) {
  const client = await pool.connect();

  try {
    const fishResult = client.query(`SELECT id FROM fishes`);
    const habitatResult = client.query(`SELECT id FROM habitats`);

    const fishIds = (await fishResult).rows.flat();
    const habitatIds = (await habitatResult).rows.flat();
    const nFishId = fishIds.length;
    const nhabitatId = habitatIds.length;

    const fishesHabitats = [];
    for (let i = 0; i < nFishHabitat; i++) {
      const fishHabitat: FishHabitat = {
        id: randomUUIDv7(),
        fishId: fishIds[Math.floor(Math.random() * nFishId)].id,
        habitatId: habitatIds[Math.floor(Math.random() * nhabitatId)].id,
      };
      fishesHabitats.push(fishHabitat);
    }

    let query: string = "";
    let values: Array<string | undefined> = [];
    const nColumn = 3;
    for (let i = 0; i < nFishHabitat; i++) {
      query = `INSERT INTO fishes_habitats(id, fish_id, habitat_id)
               VALUES ${fishesHabitats
                 .map(
                   (_, i) =>
                     `($${nColumn * i + 1},
                     $${nColumn * i + 2},
                     $${nColumn * i + 3})`,
                 )
                 .join(", ")}
               RETURNING *;`;
    }
    values = fishesHabitats.flatMap((fishHabitat) => [
      fishHabitat.id,
      fishHabitat.fishId,
      fishHabitat.habitatId,
    ]);

    await pool.query(query, values);
  } catch (error) {
    console.log(error);
  } finally {
    client.release(true);
  }
}
