import { z } from "zod";
import * as cheerio from "cheerio";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const priceRouter = createTRPCRouter({
  getPricesForGame: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const a = await fetch(
        `https://www.pricecharting.com/game/${input.url}`,
      ).then((rsp) => rsp.text());

      const $ = cheerio.load(a);
      const rates = (
        await fetch("https://api.fxratesapi.com/latest").then((rsp) =>
          rsp.json(),
        )
      ).rates;
      const loose = parseFloat(
        ($("#used_price .price").html() || "").trim().replace("$", ""),
      );
      const complete = parseFloat(
        ($("#complete_price .price").html() || "").trim().replace("$", ""),
      );
      const newPrice = parseFloat(
        ($("#new_price .price").html() || "").trim().replace("$", ""),
      );
      const box = parseFloat(
        ($("#box_only_price .price").html() || "").trim().replace("$", ""),
      );
      const manual = parseFloat(
        ($("#manual_only_price .price").html() || "").trim().replace("$", ""),
      );
      return {
        usd: {
          loose,
          complete,
          new: newPrice,
          box: box,
          manual,
        },
        gbp: {
          loose: (loose * rates.GBP).toFixed(2),
          complete: (complete * rates.GBP).toFixed(2),
          new: (newPrice * rates.GBP).toFixed(2),
          box: (box * rates.GBP).toFixed(2),
          manual: (manual * rates.GBP).toFixed(2),
        },
        eur: {
          loose: (loose * rates.EUR).toFixed(2),
          complete: (complete * rates.EUR).toFixed(2),
          new: (newPrice * rates.EUR).toFixed(2),
          box: (box * rates.EUR).toFixed(2),
          manual: (manual * rates.EUR).toFixed(2),
        },
      };
    }),
});
