import { z } from "zod";
import { Conditions, Consoles, ItemType, Region } from "@prisma/client";

export const addGameSchema = z.object({
  name: z.string().min(2).max(50),
  console: z.nativeEnum(Consoles),
  region: z.nativeEnum(Region),
  idgbId: z.optional(z.string()),
  priceChartingUrl: z.optional(z.string()),
  units: z.number(),
  purchasePrice: z.optional(z.number()),
  purchaseDate: z.optional(z.date()),
  condition: z.nativeEnum(Conditions),
  images: z.optional(z.any()),
  comments: z.optional(z.string()),
});

export const addPurchaseSchema = z.object({
  name: z.string().min(2).max(50),
  link: z.optional(z.string()),
  price: z.number(),
  shipping: z.optional(z.number()),
  units: z.number(),
  condition: z.nativeEnum(Conditions),
  type: z.nativeEnum(ItemType),
  price_charting_url: z.optional(z.string()),
});
