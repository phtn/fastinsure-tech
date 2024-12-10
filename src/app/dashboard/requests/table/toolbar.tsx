"use client";

import { type Table } from "@tanstack/react-table";
// import { DataTableFacetedFilter } from "./filter-facets";
import { PropsWithChildren, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ButtSqx, ButtStat } from "@/ui/button/index";
import { DataTableViewOptions } from "@/ui/table/components/view-options";
import { DataTablePagination } from "@/ui/table/components/pagination";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarActions: [boolean, VoidFunction];
}

export function Toolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const filterValues = table
    .getColumn("request_id")
    ?.getFilterValue() as string;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return table.getColumn("request_id")?.setFilterValue(e.target.value);
  };

  const resetFilters = () => table.resetColumnFilters();

  return (
    <div className="z-[100] flex h-fit w-full items-center justify-between rounded-t-xl border-x-[0.33px] border-t-[0.33px] border-primary-300 bg-primary-200/70 px-2">
      <div className="flex items-center space-x-1 md:space-x-4">
        <ToolbarTitle>Search</ToolbarTitle>
        <input
          type="text"
          value={filterValues}
          placeholder={"search by agent name"}
          className={cn(
            "h-8 max-w-[40ch] flex-grow rounded-md border-[0.33px] border-primary-200 pe-4 ps-4 font-jet text-xs outline-none",
            "bg-goddess/40 shadow-inner placeholder:text-primary-500 focus:bg-goddess",
            "dark:bg-primary-100/50 dark:text-icon-dark",
          )}
          onChange={handleChange}
          // autoFocus
        />
        {/* <Searchbar searchFn={handleChange} /> */}

        {/* {table.getColumn("request_id") && (
          <DataTableFacetedFilter
            column={table.getColumn("request_id")}
            // options={[]}
            title="request_id"
          />
        )} */}
        {isFiltered && <ButtSqx icon={X} onClick={resetFilters} />}
      </div>
      <DataTablePagination table={table}>
        <ToolbarTitle>Rows</ToolbarTitle>
      </DataTablePagination>
      <DataTableViewOptions
        table={table}
        toolbarActions={[false, () => false]}
      />
    </div>
  );
}

export interface SearchbarProps {
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
export const Searchbar = (props: SearchbarProps) => {
  const { searchFn, placeholder } = props;
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={cn(
        "h-10 max-w-[40ch] flex-grow rounded-lg ps-4 font-inst text-sm font-medium outline-none",
        "bg-dock-border text-void placeholder:text-primary-600",
        "dark:bg-fade-dark/30 dark:text-icon-dark",
      )}
      onChange={searchFn}
      autoFocus
    />
  );
};

const ToolbarTitle = ({ children }: PropsWithChildren) => (
  <div className="flex h-fit items-center justify-center space-x-1.5 whitespace-nowrap px-2 font-inst text-sm font-semibold tracking-tighter text-primary-700">
    {children}
  </div>
);
