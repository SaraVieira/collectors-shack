import { addPurchaseSchema } from "~/lib/schemas";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { subMonths } from "date-fns";
import { getPriceByUrl } from "~/lib/getPriceByURL";

export const purchaseRouter = createTRPCRouter({
  single: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.db.purchases.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: publicProcedure
    .input(addPurchaseSchema)
    .mutation(async ({ ctx, input }) => {
      const prices = await getPriceByUrl(input.price_charting_url);
      return ctx.db.purchases.create({
        data: { ...input, price_charting_price: prices! },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const purchase = await ctx.db.purchases.delete({
        where: {
          id: input.id,
        },
      });

      return purchase ?? {};
    }),

  getPurchases: publicProcedure.query(async ({ ctx }) => {
    const purchases = await ctx.db.purchases.findMany({
      where: {
        createdAt: {
          gte: subMonths(new Date(), 1),
        },
      },
    });
    const total = purchases

      .map((purchase) => ({
        price: purchase.price,
      }))
      .reduce((acc, curr) => {
        acc += curr.price;
        return acc;
      }, 0);

    return purchases.length ? { purchases, total } : { purchases: [] };
  }),
});
