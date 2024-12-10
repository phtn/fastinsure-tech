"use client";

import { type Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./filter-facets";
import { Dispatch, SetStateAction, useCallback, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ButtSqx } from "@/ui/button/index";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarActions: [boolean, VoidFunction];
}

export function Toolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const fuzzy = table.getGlobalFilterFn;

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      return table.setGlobalFilter(String(e.target.value));
    },
    [table],
  );

  const resetFilters = useCallback(() => table.resetColumnFilters(), [table]);

  return (
    <div className="flex h-[49px] w-full items-center justify-between bg-goddess px-2 dark:bg-darkvoid">
      <div className="flex flex-1 items-center space-x-1 md:space-x-4 md:pr-0">
        <div className="flex h-8 items-center justify-center whitespace-nowrap px-2 font-inst text-sm font-medium tracking-tighter">
          {/* Team of {table.getRowCount()} */}
        </div>
        <input
          placeholder={"new one"}
          className={cn(
            "h-10 max-w-[40ch] flex-grow rounded-lg ps-4 font-inst text-sm font-medium outline-none",
            "bg-dock-border text-void placeholder:text-primary-600",
            "dark:bg-fade-dark/30 dark:text-icon-dark",
          )}
          onChange={handleChange}
          // autoFocus
        />
        {/* <Searchbar searchFn={handleChange} /> */}

        {table.getColumn("id") && (
          <DataTableFacetedFilter
            column={table.getColumn("id")}
            options={[]}
            title=""
          />
        )}
        {isFiltered && <ButtSqx icon={X} onClick={resetFilters} />}
      </div>
      {/* <DataTableViewOptions table={table} toolbarActions={toolbarActions} /> */}
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
