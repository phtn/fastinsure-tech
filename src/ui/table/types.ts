import type { DualIcon } from "@/app/types";
import type { Column, ColumnDef } from "@tanstack/react-table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
}

export type Option = {
  value: string;
  label: string;
  icon: DualIcon;
  color: string;
  cell: string;
};

export type ImageOption = {
  value: string;
  label: string;
  icon: DualIcon;
  color: string;
  cell: string;
  url: string;
  complete: string;
};

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options?: Option[];
}
