import { z } from "zod";
import { Conditions, Consoles, Region } from "@prisma/client";

export const addGameSchema = z.object({
  name: z.string().min(2).max(50),
  console: z.enum(Object.keys(Consoles) as any),
  region: z.enum(Object.keys(Region) as any),
  idgbId: z.optional(z.string()),
  priceChartingUrl: z.optional(z.string()),
  units: z.number(),
  purchasePrice: z.optional(z.number()),
  purchaseDate: z.optional(z.date()),
  condition: z.enum(Object.keys(Conditions) as any),
  images: z.optional(z.any()),
  comments: z.optional(z.string()),
});
