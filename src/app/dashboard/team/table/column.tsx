"use client";

import { type CellContext, createColumnHelper } from "@tanstack/react-table";

import type schema from "@convex/schema";
import { cn } from "@/lib/utils";
import { nameHeaderNumber } from "@/ui/table/components/name-cells";

type C = typeof schema.tables.users.validator.fieldPaths;

interface CellProps<T, D> {
  prop: D;
  ctx?: CellContext<T, unknown>;
}
const numberCell = <T, D extends string>({ prop, ctx }: CellProps<T, D>) => (
  <div className="-mx-4 flex h-36 items-center justify-end">
    <p
      className={cn(
        "font-inter text-sm font-bold tracking-tight text-foreground/30",
      )}
    >
      {ctx?.row.getValue(prop)}
    </p>
  </div>
);

const titleCell = <T, D extends string>({ prop, ctx }: CellProps<T, D>) => (
  <div className="flex h-36 rounded-lg bg-foreground/10 p-6">
    <p
      className={cn(
        "font-inter text-sm font-bold tracking-tight text-foreground/30",
      )}
    >
      {ctx?.row.getValue(prop)}
    </p>
  </div>
);

const cellValue =
  <T, D extends string>(prop: D) =>
  (ctx: CellContext<T, unknown>) =>
    numberCell<T, D>({ prop, ctx });

const cellTitle =
  <T, D extends string>(prop: D) =>
  (ctx: CellContext<T, unknown>) =>
    titleCell<T, D>({ prop, ctx });

const columnHelper = createColumnHelper();

export const columns = [
  columnHelper.accessor("id", {
    // header: nameHeaderIcon({ icon: BuildingStorefrontIcon }),
    id: "id",
    cell: cellTitle("id"),
    enableSorting: false,
  }),

  // columnHelper.accessor("value", {
  //   header: nameHeaderNumber("Coins"),
  //   cell: cellValue("value"),
  //   enableHiding: true,
  //   enableSorting: false,
  // }),
];
