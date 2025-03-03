/*
  Warnings:

  - You are about to drop the `FishesHabitats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FishesPredator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FishToHabitat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FishToPredator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FishesHabitats" DROP CONSTRAINT "FishesHabitats_fishId_fkey";

-- DropForeignKey
ALTER TABLE "FishesHabitats" DROP CONSTRAINT "FishesHabitats_habitatId_fkey";

-- DropForeignKey
ALTER TABLE "FishesPredator" DROP CONSTRAINT "FishesPredator_fishId_fkey";

-- DropForeignKey
ALTER TABLE "FishesPredator" DROP CONSTRAINT "FishesPredator_habitatId_fkey";

-- DropForeignKey
ALTER TABLE "FishesPredator" DROP CONSTRAINT "FishesPredator_predatorId_fkey";

-- DropForeignKey
ALTER TABLE "_FishToHabitat" DROP CONSTRAINT "_FishToHabitat_A_fkey";

-- DropForeignKey
ALTER TABLE "_FishToHabitat" DROP CONSTRAINT "_FishToHabitat_B_fkey";

-- DropForeignKey
ALTER TABLE "_FishToPredator" DROP CONSTRAINT "_FishToPredator_A_fkey";

-- DropForeignKey
ALTER TABLE "_FishToPredator" DROP CONSTRAINT "_FishToPredator_B_fkey";

-- DropTable
DROP TABLE "FishesHabitats";

-- DropTable
DROP TABLE "FishesPredator";

-- DropTable
DROP TABLE "_FishToHabitat";

-- DropTable
DROP TABLE "_FishToPredator";

-- CreateTable
CREATE TABLE "FishHabitat" (
    "id" TEXT NOT NULL,
    "fishId" TEXT NOT NULL,
    "habitatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FishHabitat_pkey" PRIMARY KEY ("id","fishId","habitatId")
);

-- CreateTable
CREATE TABLE "FishPredator" (
    "id" TEXT NOT NULL,
    "fishId" TEXT NOT NULL,
    "predatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FishPredator_pkey" PRIMARY KEY ("id","fishId","predatorId")
);

-- AddForeignKey
ALTER TABLE "FishHabitat" ADD CONSTRAINT "FishHabitat_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishHabitat" ADD CONSTRAINT "FishHabitat_habitatId_fkey" FOREIGN KEY ("habitatId") REFERENCES "Habitat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishPredator" ADD CONSTRAINT "FishPredator_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishPredator" ADD CONSTRAINT "FishPredator_predatorId_fkey" FOREIGN KEY ("predatorId") REFERENCES "Predator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
