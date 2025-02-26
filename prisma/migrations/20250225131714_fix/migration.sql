/*
  Warnings:

  - You are about to drop the column `fishId` on the `Habitat` table. All the data in the column will be lost.
  - You are about to drop the column `fishId` on the `Predator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Habitat" DROP CONSTRAINT "Habitat_fishId_fkey";

-- DropForeignKey
ALTER TABLE "Predator" DROP CONSTRAINT "Predator_fishId_fkey";

-- AlterTable
ALTER TABLE "Fish" ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "diet" DROP NOT NULL,
ALTER COLUMN "lifespan" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "waterType" DROP NOT NULL,
ALTER COLUMN "reproduction" DROP NOT NULL,
ALTER COLUMN "behavior" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Habitat" DROP COLUMN "fishId";

-- AlterTable
ALTER TABLE "Predator" DROP COLUMN "fishId";

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
