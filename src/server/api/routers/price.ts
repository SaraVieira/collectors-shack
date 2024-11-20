import { z } from "zod";
import { getPriceByUrl } from "~/lib/getPriceByURL";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const priceRouter = createTRPCRouter({
  getPricesForGame: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const prices = await getPriceByUrl(input.url);

      return prices;
    }),
});
