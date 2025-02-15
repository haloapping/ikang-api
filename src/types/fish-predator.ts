import { z } from "zod";

export const FishPredatorSchema = z.object({
  id: z.string().optional(),
  fishId: z.string(),
  predatorId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.union([z.date(), z.null()]).optional(),
});

export type FishPredator = z.infer<typeof FishPredatorSchema>;
