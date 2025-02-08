import { Fish } from "./types";

export const fishes: Fish[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Clownfish",
    scientificName: "Amphiprioninae",
    habitat: "Coral reefs",
    size: "4-5 inches",
    diet: "Plankton, algae",
    lifespan: "6-10 years",
    status: "Least Concern",
    color: "Orange with white bands",
    waterType: "Saltwater",
    reproduction: "Egg-laying",
    predators: ["Larger fish", "Eels"],
    behavior: "Lives in symbiosis with sea anemones",
  },
  {
    id: "6f9619ff-8b86-d011-b42d-00cf4fc964ff",
    name: "Great White Shark",
    scientificName: "Carcharodon carcharias",
    habitat: "Oceans (coastal and offshore)",
    size: "15-20 feet",
    diet: "Fish, seals, sea lions",
    lifespan: "30-70 years",
    status: "Vulnerable",
    color: "Grayish upper body, white underside",
    waterType: "Saltwater",
    reproduction: "Ovoviviparous (live birth from eggs inside mother)",
    predators: ["Humans (fishing)", "Orcas"],
    behavior: "Solitary, apex predator",
  },
];
