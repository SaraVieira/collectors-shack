"use client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
export const DeleteButton = ({ id }: { id: string }) => {
  const { push } = useRouter();
  const createGame = api.games.delete.useMutation({
    onSuccess: async (data) => push(`/`),
  });

  const deleteGame = () => {
    if (window.confirm("You sure?")) {
      createGame.mutateAsync({ id });
    }
  };

  return (
    <Button variant="destructive" size="icon" onClick={deleteGame}>
      <Trash className="h-5 w-5" />
      <span className="sr-only">Delete</span>
    </Button>
  );
};
