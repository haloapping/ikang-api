import { PrismaClient } from "@prisma/client";
import { fishes, habitats, predators } from "./data";

const prisma = new PrismaClient();

async function main() {
  await prisma.fish.createMany({
    data: fishes,
  });

  await prisma.habitat.createMany({
    data: habitats,
  });

  await prisma.predator.createMany({
    data: predators,
  });

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
