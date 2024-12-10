import { redirect } from "next/navigation";
import { AddForm } from "./_components/form";
import { auth } from "~/server/auth";

export default async function Add() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <AddForm session={session} />;
}
