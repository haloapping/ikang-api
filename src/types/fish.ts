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

type Fish = z.infer<typeof FishSchema>;

export { Fish, FishSchema };
