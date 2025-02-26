/*
  Warnings:

  - You are about to drop the `FishHabitat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FishPredator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FishHabitat" DROP CONSTRAINT "FishHabitat_fishId_fkey";

-- DropForeignKey
ALTER TABLE "FishHabitat" DROP CONSTRAINT "FishHabitat_habitatId_fkey";

-- DropForeignKey
ALTER TABLE "FishPredator" DROP CONSTRAINT "FishPredator_fishId_fkey";

-- DropForeignKey
ALTER TABLE "FishPredator" DROP CONSTRAINT "FishPredator_predatorId_fkey";

-- AlterTable
ALTER TABLE "Habitat" ADD COLUMN     "fishId" TEXT;

-- AlterTable
ALTER TABLE "Predator" ADD COLUMN     "fishId" TEXT;

-- DropTable
DROP TABLE "FishHabitat";

-- DropTable
DROP TABLE "FishPredator";

-- AddForeignKey
ALTER TABLE "Habitat" ADD CONSTRAINT "Habitat_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Predator" ADD CONSTRAINT "Predator_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE SET NULL ON UPDATE CASCADE;
