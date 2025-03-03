import { PrismaClient } from "@prisma/client";
import { fishes, habitats, predators } from "./data";

const prisma = new PrismaClient();

async function main() {
  await prisma.habitat.deleteMany();
  const resultHabitats = await prisma.habitat.createMany({
    data: habitats,
  });
  console.log({ resultHabitats });

  await prisma.predator.deleteMany();
  const resultPredators = await prisma.predator.createMany({
    data: predators,
  });
  console.log({ resultPredators });

  for (const fish of fishes) {
    const { habitatSlugs, predatorSlugs, ...fishData } = fish;

    const upsertData = {
      ...fishData,
      habitats: {
        connect: habitatSlugs
          ? habitatSlugs.map((slug) => ({ slug }))
          : undefined,
      },
      predators: {
        connect: predatorSlugs
          ? predatorSlugs.map((slug) => ({ slug }))
          : undefined,
      },
    };

    const newFishData = await prisma.fish.upsert({
      where: { slug: fish.slug },
      create: upsertData,
      update: upsertData,
    });

    console.log(`🐟 Fish: ${newFishData.name}`);
  }

  console.log("Fish, habitat and predator data created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
