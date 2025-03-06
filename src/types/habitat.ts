import { z } from "zod";

export const HabitatSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  name: z.enum([
    "Freshwater",
    "Saltwater",
    "Brackish",
    "River",
    "Lake",
    "Deep Sea",
    "Reef",
    "Open Ocean",
  ]),
  createdAt: z.date().optional().optional(),
  updatedAt: z.union([z.date(), z.null()]).optional(),
});

export type Habitat = z.infer<typeof HabitatSchema>;
