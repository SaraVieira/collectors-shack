"use client";

import { Game } from "@prisma/client";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { platformsMap } from "~/lib/platforms";
import { conditionsMap, Price } from "~/lib/utils";

const SortableHeader = ({
  column,
  children,
}: {
  column: Column<Game>;
  children: React.ReactNode;
}) => (
  <Button
    variant="link"
    className="p-0"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableHeader column={column}>Name</SortableHeader>;
    },
  },
  {
    accessorKey: "console",
    header: ({ column }) => {
      return <SortableHeader column={column}>Console</SortableHeader>;
    },
    cell: ({ row }) => {
      return (
        platformsMap[row.getValue("console") as keyof typeof platformsMap] ||
        row.getValue("console")
      );
    },
  },
  {
    id: "price",
    accessorKey: "price.gbp",
    header: ({ column }) => {
      return <SortableHeader column={column}>Price</SortableHeader>;
    },
    cell: ({ row }) => {
      if (!row.getValue("price")) return null;
      const amount = parseFloat(
        (row.getValue("price") as any)[
          (row.getValue("condition") as string).toLocaleLowerCase()
        ],
      );
      const formatted = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return formatted;
    },
    sortingFn: (rowA, rowB, _columnId) => {
      const priceA =
        // @ts-ignore
        (rowA.original.price as Price)?.gbp[
          (
            rowA.getValue("condition") as keyof typeof conditionsMap
          ).toLocaleLowerCase()
        ] || 0;
      const priceB =
        // @ts-ignore
        (rowB.original.price as Price)?.gbp[
          (
            rowB.getValue("condition") as keyof typeof conditionsMap
          ).toLocaleLowerCase()
        ] || 0;
      return priceB - priceA;
    },
  },
  {
    accessorKey: "condition",
    header: ({ column }) => {
      return <SortableHeader column={column}>Confition</SortableHeader>;
    },
    cell: ({ row }) => {
      return conditionsMap[
        row.getValue("condition") as keyof typeof conditionsMap
      ];
    },
  },
  {
    accessorKey: "units",
    header: ({ column }) => {
      return <SortableHeader column={column}>Units</SortableHeader>;
    },
  },
];
