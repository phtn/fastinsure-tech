import {
  type CellContext,
  type Column,
  ColumnDef,
  type ColumnHelper,
  createColumnHelper,
} from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import {
  nameHeaderFit,
  nameHeaderNumber,
} from "@/ui/table/components/name-cells";
import { type SelectRequest } from "@convex/requests/d";

interface CellProps<T, D> {
  prop: D;
  ctx?: CellContext<T, unknown>;
}
const numberCell = <T, D extends string>({ prop, ctx }: CellProps<T, D>) => (
  <div className="flex h-full items-center">
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
  <div className="flex h-full">
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

const columnHelper: ColumnHelper<SelectRequest> = createColumnHelper();

export const columns = [
  columnHelper.accessor("request_id", {
    header: nameHeaderFit("ID"),
    id: "request_id",
    cell: cellTitle("request_id"),
    enableSorting: false,
    enableHiding: true,
  }),
  columnHelper.accessor("assured_name", {
    header: nameHeaderFit("Assured Info"),
    cell: cellValue("assured_name"),
    enableHiding: true,
    enableSorting: false,
  }),
  columnHelper.accessor("policy_type", {
    header: nameHeaderFit("Policy Info"),
    cell: cellValue("policy_type"),
    enableHiding: true,
    enableSorting: true,
  }),
  columnHelper.accessor("service_type", {
    header: nameHeaderFit("Service Info"),
    cell: cellValue("service_type"),
    enableHiding: true,
    enableSorting: true,
  }),
  columnHelper.accessor("agent_name", {
    header: nameHeaderFit("Agent"),
    cell: cellValue("agent_name"),
    enableHiding: true,
    enableSorting: false,
  }),
  columnHelper.accessor("status", {
    header: nameHeaderFit("Status"),
    cell: cellValue("status"),
    enableHiding: true,
    enableSorting: true,
  }),
] as ColumnDef<SelectRequest>[];
