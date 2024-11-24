import { DataTable } from "~/components/tables/purchases/table";
import { columns } from "~/components/tables/purchases/columns";
import { api, HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { NewPurchase } from "./_components/new";

export default async function Home() {
  const data = await api.purchases.getPurchases();
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center text-white">
        <NewPurchase />
        <DataTable columns={columns} data={data.purchases} total={data.total} />
      </main>
    </HydrateClient>
  );
}
