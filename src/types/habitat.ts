import { z } from "zod";

export const HabitatSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1).optional(),
  name: z.string().min(1),
  createdAt: z.date().optional().optional(),
  updatedAt: z.union([z.date(), z.null()]).optional(),
});

export type Habitat = z.infer<typeof HabitatSchema>;
