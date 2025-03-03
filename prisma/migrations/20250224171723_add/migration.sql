-- CreateTable
CREATE TABLE "FishesPredator" (
    "fishId" TEXT NOT NULL,
    "predatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "habitatId" TEXT,

    CONSTRAINT "FishesPredator_pkey" PRIMARY KEY ("fishId","predatorId")
);

-- AddForeignKey
ALTER TABLE "FishesPredator" ADD CONSTRAINT "FishesPredator_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishesPredator" ADD CONSTRAINT "FishesPredator_predatorId_fkey" FOREIGN KEY ("predatorId") REFERENCES "Predator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishesPredator" ADD CONSTRAINT "FishesPredator_habitatId_fkey" FOREIGN KEY ("habitatId") REFERENCES "Habitat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
