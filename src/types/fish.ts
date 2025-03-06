import { z } from "zod";

const FishSchema = z.object({
  id: z.string().min(1).optional(),
  slug: z.string().min(1),
  name: z.string().min(1),
  scientificName: z.string().min(1).optional(),
  habitat: z.string().min(1).optional(),
  size: z.string().min(1).optional(),
  diet: z.string().min(1).optional(),
  lifespan: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  waterType: z.string().min(1).optional(),
  reproduction: z.string().min(1).optional(),
  predators: z.array(z.string()).optional(),
  behavior: z.string().min(1).optional(),
  createdAt: z.date().optional().optional(),
  updatedAt: z.union([z.date(), z.null()]).optional(),
});

type Fish = z.infer<typeof FishSchema>;

export { Fish, FishSchema };
