import { PrismaClient } from "@prisma/client";
import { random } from "underscore";
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

  for (let i = 0; i < resultFishes.length; i++) {
    await prisma.fishHabitat.create({
      data: {
        fishId: resultFishes[i].id,
        habitatId: resultHabitats[random(resultHabitats.length - 1)].id,
      },
    });
  }
  console.log("Fish Habitat data created");

  for (let i = 0; i < 50; i++) {
    await prisma.fishPredator.create({
      data: {
        fishId: resultFishes[random(resultFishes.length - 1)].id,
        predatorId: resultPredators[random(resultPredators.length - 1)].id,
      },
    });
  }
  console.log("Fish Predator data created");
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
