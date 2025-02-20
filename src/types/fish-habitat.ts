import { z } from "zod";

export const FishHabitatSchema = z.object({
  id: z.string().optional(),
  fishId: z.string(),
  habitatId: z.string(),
  createdAt: z.date().optional().optional(),
  updatedAt: z.union([z.date(), z.null()]).optional(),
});

export type FishHabitat = z.infer<typeof FishHabitatSchema>;
