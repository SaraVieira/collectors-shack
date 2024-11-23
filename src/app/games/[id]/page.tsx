import React from "react";
import { platformsMap } from "~/lib/platforms";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Edit, Link2 } from "lucide-react";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import { conditionsMap, CurrencyType, Price } from "~/lib/utils";
import Link from "next/link";
import { DeleteButton } from "./_components/delete";
import { auth } from "~/server/auth";

export default async function GameInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  const { id } = await params;
  const game = await api.games.single({ id });
  if (!session) {
    redirect("/api/auth/signin");
  }
  if (!game) {
    redirect("/");
  }

  return (
    <HydrateClient>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-start justify-between">
            <h1 className="text-4xl font-bold">{game.name}</h1>
            <div className="flex items-center gap-4">
              <Link href={`/games/${id}/edit`}>
                <Button variant="secondary" size="icon">
                  <Edit className="h-5 w-5" />
                  <span className="sr-only">Edit</span>
                </Button>
              </Link>
              <DeleteButton id={id} />
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.info?.cover}.jpg`}
                alt="Game Cover"
                width={264}
                height={352}
                className="w-full rounded-lg object-cover"
              />
            </div>
            <div>
              <h2 className="mb-2 text-2xl font-semibold">Details</h2>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span>Price:</span>
                  {
                    (game.price as Price)?.gbp[
                      game.condition.toLocaleLowerCase() as keyof CurrencyType
                    ]
                  }
                  £
                </li>
                <li className="flex items-center justify-between">
                  <span>Console:</span>
                  <Badge variant="outline">
                    {platformsMap[game.console as keyof typeof platformsMap]}
                  </Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Units Owned:</span>
                  <Badge variant="outline">{game.units}</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Condition:</span>
                  <Badge variant="outline">
                    {conditionsMap[game.condition]}
                  </Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>Region:</span>
                  <Badge variant="outline">{game.region}</Badge>
                </li>
                <li className="flex items-center justify-between">
                  <span>IGDB Page:</span>
                  <Button variant={"link"}>
                    <Link
                      className="flex items-center gap-1"
                      href={`https://www.igdb.com/games/${game.info?.slug}`}
                      target="_blank"
                    >
                      IGDB <Link2 />
                    </Link>
                  </Button>
                </li>
                <li className="flex items-center justify-between">
                  <span>Price Charting Page:</span>
                  <Button variant={"link"}>
                    <Link
                      className="flex items-center gap-1"
                      href={`https://www.pricecharting.com/game/${game.price_charting_url}`}
                      target="_blank"
                    >
                      Price Charting <Link2 />
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="my-6">
            <h2 className="mb-2 text-2xl font-semibold">Description</h2>
            <p className="text-gray-300">{game.info?.summary}</p>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
