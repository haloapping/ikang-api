-- CreateTable
CREATE TABLE "Fish" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT,
    "size" TEXT,
    "diet" TEXT,
    "lifespan" TEXT,
    "status" TEXT,
    "color" TEXT,
    "waterType" TEXT,
    "reproduction" TEXT,
    "behavior" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habitat" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Habitat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Predator" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Predator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishHabitat" (
    "id" TEXT NOT NULL,
    "fishId" TEXT NOT NULL,
    "habitatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FishHabitat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FishPredator" (
    "id" TEXT NOT NULL,
    "fishId" TEXT NOT NULL,
    "predatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FishPredator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fish_name_key" ON "Fish"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Fish_scientificName_key" ON "Fish"("scientificName");

-- CreateIndex
CREATE UNIQUE INDEX "Habitat_name_key" ON "Habitat"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Predator_name_key" ON "Predator"("name");

-- AddForeignKey
ALTER TABLE "FishHabitat" ADD CONSTRAINT "FishHabitat_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishHabitat" ADD CONSTRAINT "FishHabitat_habitatId_fkey" FOREIGN KEY ("habitatId") REFERENCES "Habitat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishPredator" ADD CONSTRAINT "FishPredator_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FishPredator" ADD CONSTRAINT "FishPredator_predatorId_fkey" FOREIGN KEY ("predatorId") REFERENCES "Predator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
