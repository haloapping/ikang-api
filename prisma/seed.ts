import { PrismaClient } from "@prisma/client";
import { random, sample } from "underscore";
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

  for (const fish of fishes) {
    await prisma.fish.create({
      data: {
        ...fish,
        habitats: {
          connect: sample(resultHabitats, 1),
        },
        predators: {
          connect: sample(resultPredators, random(1, predators.length - 1)),
        },
      },
    });
  }
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
