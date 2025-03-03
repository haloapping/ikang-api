-- DropForeignKey
ALTER TABLE "FishHabitat" DROP CONSTRAINT "FishHabitat_fishId_fkey";

-- DropForeignKey
ALTER TABLE "FishHabitat" DROP CONSTRAINT "FishHabitat_habitatId_fkey";

-- DropForeignKey
ALTER TABLE "FishPredator" DROP CONSTRAINT "FishPredator_fishId_fkey";

-- DropForeignKey
ALTER TABLE "FishPredator" DROP CONSTRAINT "FishPredator_predatorId_fkey";

-- AddForeignKey
ALTER TABLE "FishHabitat" ADD CONSTRAINT "FishHabitat_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishHabitat" ADD CONSTRAINT "FishHabitat_habitatId_fkey" FOREIGN KEY ("habitatId") REFERENCES "Habitat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishPredator" ADD CONSTRAINT "FishPredator_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishPredator" ADD CONSTRAINT "FishPredator_predatorId_fkey" FOREIGN KEY ("predatorId") REFERENCES "Predator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
