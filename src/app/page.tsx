import { DataTable } from "~/components/tables/index/table";
import { columns } from "~/components/tables/index/columns";
import { api, HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const data = await api.games.getGames();
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center text-white">
        <DataTable columns={columns} data={data.games} total={data.total} />
      </main>
    </HydrateClient>
  );
}
