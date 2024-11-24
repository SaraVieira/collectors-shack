"use client";

import { Purchases } from "@prisma/client";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { conditionsMap } from "~/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";

const SortableHeader = ({
  column,
  children,
}: {
  column: Column<Purchases>;
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

export const columns: ColumnDef<Purchases>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableHeader column={column}>Name</SortableHeader>;
    },
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return <SortableHeader column={column}>Price</SortableHeader>;
    },
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
      }).format(row.getValue("price"));

      return formatted;
    },
  },
  {
    id: "price_charting_price",
    accessorKey: "price_charting_price.gbp",
    header: ({ column }) => {
      return <SortableHeader column={column}>PC Price</SortableHeader>;
    },
    cell: ({ row }) => {
      if (!row.getValue("price_charting_price")) return null;
      const amount = parseFloat(
        (row.getValue("price_charting_price") as any)[
          (row.getValue("condition") as string).toLocaleLowerCase()
        ],
      );
      const formatted = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "GBP",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <SortableHeader column={column}>Date</SortableHeader>;
    },
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "link",
    header: ({ column }) => {
      return <SortableHeader column={column}>Link</SortableHeader>;
    },

    cell: ({ row }) => {
      return (
        <Link href={row.original.link!} target="_blank">
          Open Link
        </Link>
      );
    },
  },
  {
    accessorKey: "condition",
    header: ({ column }) => {
      return <SortableHeader column={column}>Condition</SortableHeader>;
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
  {
    id: "actions",
    cell: ({ row }) => {
      const purchase = row.original;
      const deletePurchase = api.purchases.delete.useMutation();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                await deletePurchase.mutateAsync({ id: purchase.id });
                location.reload();
              }}
            >
              Delete
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
