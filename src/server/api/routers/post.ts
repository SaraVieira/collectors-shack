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
      console.log(
        JSON.stringify({
          create: {
            ...omit(info, [
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
            age_ratings: {
              createMany: {
                skipDuplicates: true,
                data: info.age_ratings,
              },
            },
            websites: {
              createMany: {
                skipDuplicates: true,
                data: info.websites,
              },
            },
            videos: {
              createMany: {
                skipDuplicates: true,
                data: info.videos,
              },
            },
            themes: {
              createMany: {
                skipDuplicates: true,
                data: info.themes,
              },
            },
            screenshots: {
              createMany: {
                skipDuplicates: true,
                data: info.screenshots,
              },
            },
            game_modes: {
              createMany: {
                skipDuplicates: true,
                data: info.game_modes,
              },
            },
            alternative_names: {
              createMany: {
                skipDuplicates: true,
                data: info.alternative_names,
              },
            },
            franchises: {
              createMany: {
                skipDuplicates: true,
                data: info.franchises,
              },
            },
            genres: {
              createMany: {
                skipDuplicates: true,
                data: info.genres,
              },
            },
            involved_companies: {
              createMany: {
                skipDuplicates: true,
                data: info.involved_companies,
              },
            },
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
        }),
      );
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
                age_ratings: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.age_ratings,
                  },
                },
                websites: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.websites,
                  },
                },
                videos: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.videos,
                  },
                },
                themes: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.themes,
                  },
                },
                screenshots: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.screenshots,
                  },
                },
                game_modes: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.game_modes,
                  },
                },
                alternative_names: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.alternative_names,
                  },
                },
                franchises: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.franchises,
                  },
                },
                genres: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.genres,
                  },
                },
                involved_companies: {
                  createMany: {
                    skipDuplicates: true,
                    data: info.involved_companies,
                  },
                },
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

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });

  //   return post ?? null;
  // }),
});
