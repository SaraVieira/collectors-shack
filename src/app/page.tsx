import { DataTable } from "~/components/tables/index/table";
import { columns } from "~/components/tables/index/columns";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const data = await api.games.getGames();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center text-white">
        <DataTable columns={columns} data={data.games} total={data.total} />
      </main>
    </HydrateClient>
  );
}
