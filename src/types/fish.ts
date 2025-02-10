import { z } from "zod";

const FishSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1),
  scientificName: z.string().min(1),
  habitat: z.string().min(1),
  size: z.string().min(1),
  diet: z.string().min(1),
  lifespan: z.string().min(1),
  status: z.string().min(1),
  color: z.string().min(1),
  waterType: z.string().min(1),
  reproduction: z.string().min(1),
  predators: z.array(z.string()),
  behavior: z.string().min(1),
  createdAt: z.date().optional(),
  updatedAt: z.union([z.date(), z.null()]).optional(),
});

export const fishExample: Fish = {
  name: "Blue Whale",
  scientificName: "Balaenoptera musculus",
  habitat: "Oceans",
  size: "82-105 feet",
  diet: "Krill, small fish",
  lifespan: "70-90 years",
  status: "Endangered",
  color: "Blue-gray",
  waterType: "Saltwater",
  reproduction: "Viviparous (live birth)",
  predators: ["Humans (whaling)", "Orcas"],
  behavior: "Largest animal on Earth",
  createdAt: new Date(),
  updatedAt: null,
};

type Fish = z.infer<typeof FishSchema>;

export { Fish, FishSchema };
