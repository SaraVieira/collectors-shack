import { z } from "zod";
import { getPriceByUrl } from "~/lib/getPriceByURL";
import { addGameSchema } from "~/lib/schemas";
import { getGame } from "~/lib/idgb_api";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { omit } from "lodash-es";

export const gamesRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  create: publicProcedure
    .input(addGameSchema)
    .mutation(async ({ ctx, input }) => {
      const prices = await getPriceByUrl(input.priceChartingUrl);
      const info = await getGame(input.idgbId);

      return ctx.db.game.create({
        data: {
          name: input.name,
          condition: input.condition,
          console: input.console,
          region: input.region,
          units: input.units,
          purchase_date: input.purchaseDate,
          igdb_id: input.idgbId,
          ...(prices && {
            price: prices,
          }),
          price_charting_url: input.priceChartingUrl,
          purchase_price: input.purchasePrice,
          info: {
            connectOrCreate: {
              create: {
                ...omit(info, [
                  "ports",
                  "websites",
                  "videos",
                  "themes",
                  "screenshots",
                  "game_modes",
                  "age_ratings",
                  "alternative_names",
                  "franchises",
                  "genres",
                  "involved_companies",
                  "platforms",
                  "release_dates",
                ]),
                ...(info.age_ratings && {
                  age_ratings: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.age_ratings,
                    },
                  },
                }),
                ...(info.websites && {
                  websites: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.websites,
                    },
                  },
                }),
                ...(info.videos && {
                  videos: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.videos,
                    },
                  },
                }),
                ...(info.themes && {
                  themes: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.themes,
                    },
                  },
                }),
                ...(info.screenshots && {
                  screenshots: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.screenshots,
                    },
                  },
                }),
                ...(info.game_modes && {
                  game_modes: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.game_modes,
                    },
                  },
                }),
                ...(info.alternative_names && {
                  alternative_names: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.alternative_names,
                    },
                  },
                }),
                ...(info.franchises && {
                  franchises: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.franchises,
                    },
                  },
                }),
                ...(info.genres && {
                  genres: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.genres,
                    },
                  },
                }),
                ...(info.involved_companies && {
                  involved_companies: {
                    createMany: {
                      skipDuplicates: true,
                      data: info.involved_companies,
                    },
                  },
                }),
                platforms: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.platforms,
                  },
                },
                release_dates: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.release_dates,
                  },
                },
              },
              where: {
                id: info.id,
              },
            },
          },
        },
      });
    }),

  getGames: publicProcedure.query(async ({ ctx }) => {
    const games = await ctx.db.game.findMany({
      include: {
        info: true,
      },
    });

    return games ?? [];
  }),
});
