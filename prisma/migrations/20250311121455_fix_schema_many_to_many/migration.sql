/*
  Warnings:

  - You are about to drop the `_FishToHabitat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FishToPredator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FishToHabitat" DROP CONSTRAINT "_FishToHabitat_A_fkey";

-- DropForeignKey
ALTER TABLE "_FishToHabitat" DROP CONSTRAINT "_FishToHabitat_B_fkey";

-- DropForeignKey
ALTER TABLE "_FishToPredator" DROP CONSTRAINT "_FishToPredator_A_fkey";

-- DropForeignKey
ALTER TABLE "_FishToPredator" DROP CONSTRAINT "_FishToPredator_B_fkey";

-- DropTable
DROP TABLE "_FishToHabitat";

-- DropTable
DROP TABLE "_FishToPredator";

-- CreateTable
CREATE TABLE "_FishHabitatRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FishHabitatRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FishPredatorRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FishPredatorRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FishHabitatRelation_B_index" ON "_FishHabitatRelation"("B");

-- CreateIndex
CREATE INDEX "_FishPredatorRelation_B_index" ON "_FishPredatorRelation"("B");

-- AddForeignKey
ALTER TABLE "_FishHabitatRelation" ADD CONSTRAINT "_FishHabitatRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FishHabitatRelation" ADD CONSTRAINT "_FishHabitatRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Habitat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FishPredatorRelation" ADD CONSTRAINT "_FishPredatorRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FishPredatorRelation" ADD CONSTRAINT "_FishPredatorRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Predator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
