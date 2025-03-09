import { PrismaClient } from "@prisma/client";
import { fishes, habitats, predators } from "./data";

const prisma = new PrismaClient();

async function main() {
  const resultHabitats = await prisma.habitat.createManyAndReturn({
    data: habitats,
    select: {
      id: true,
    },
  });
  console.log("Habitat data created");

  const resultPredators = await prisma.predator.createManyAndReturn({
    data: predators,
    select: {
      id: true,
    },
  });
  console.log("Predator data created");

  const resultFishes = await prisma.fish.createManyAndReturn({
    data: fishes,
    select: {
      id: true,
    },
  });
  console.log("Fish data created");
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
