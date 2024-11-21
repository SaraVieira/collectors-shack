"use client";

import { Game } from "@prisma/client";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";

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
  },
  {
    id: "price",
    accessorKey: "price.gbp.loose",
    header: ({ column }) => {
      return <SortableHeader column={column}>Price</SortableHeader>;
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "units",
    header: ({ column }) => {
      return <SortableHeader column={column}>Units</SortableHeader>;
    },
  },
];
