import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const price = await api.prices.getPricesForGame({
    url: "pal-gameboy/tintin-prisoners-of-the-sun",
  });

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center text-white">
        <Button>sup</Button>
        {JSON.stringify(price, null, 2)}
      </main>
    </HydrateClient>
  );
}
