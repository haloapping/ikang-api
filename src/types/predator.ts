import { z } from "zod";

export const PredatorSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.union([z.date(), z.null()]).optional(),
});

export type Predator = z.infer<typeof PredatorSchema>;
