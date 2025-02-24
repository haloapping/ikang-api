-- CreateTable
CREATE TABLE "Fish" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "lifespan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "waterType" TEXT NOT NULL,
    "reproduction" TEXT NOT NULL,
    "behavior" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishesHabitats" (
    "fishId" TEXT NOT NULL,
    "habitatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FishesHabitats_pkey" PRIMARY KEY ("fishId","habitatId")
);

-- CreateTable
CREATE TABLE "Habitat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Habitat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Predator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Predator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FishToHabitat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FishToHabitat_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FishToPredator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FishToPredator_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fish_name_key" ON "Fish"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Fish_scientificName_key" ON "Fish"("scientificName");

-- CreateIndex
CREATE UNIQUE INDEX "Habitat_name_key" ON "Habitat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Predator_name_key" ON "Predator"("name");

-- CreateIndex
CREATE INDEX "_FishToHabitat_B_index" ON "_FishToHabitat"("B");

-- CreateIndex
CREATE INDEX "_FishToPredator_B_index" ON "_FishToPredator"("B");

-- AddForeignKey
ALTER TABLE "FishesHabitats" ADD CONSTRAINT "FishesHabitats_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishesHabitats" ADD CONSTRAINT "FishesHabitats_habitatId_fkey" FOREIGN KEY ("habitatId") REFERENCES "Habitat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FishToHabitat" ADD CONSTRAINT "_FishToHabitat_A_fkey" FOREIGN KEY ("A") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FishToHabitat" ADD CONSTRAINT "_FishToHabitat_B_fkey" FOREIGN KEY ("B") REFERENCES "Habitat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FishToPredator" ADD CONSTRAINT "_FishToPredator_A_fkey" FOREIGN KEY ("A") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FishToPredator" ADD CONSTRAINT "_FishToPredator_B_fkey" FOREIGN KEY ("B") REFERENCES "Predator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
