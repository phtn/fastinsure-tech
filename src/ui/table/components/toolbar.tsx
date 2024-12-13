"use client";

import { type Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./filter-facets";
import { statuses } from "@/ui/table/components/statuses";
import { type ChangeEvent } from "react";
import { Searchbar } from "@/app/dashboard/team/table/toolbar";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarActions: [boolean, VoidFunction];
}

export function Toolbar<TData>({
  table,
  // toolbarActions,
}: DataTableToolbarProps<TData>) {
  // const isFiltered = table.getState().columnFilters.length > 0;
  // const filterValues =
  //   table.getColumn("uid")?.getFilterValue() as string;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    return table.getColumn("uid")?.setFilterValue(e.target.value);
  };

  return (
    <div className="flex h-[56px] w-full items-center justify-between bg-primary-100/50 px-1">
      <div className="text-opus flex flex-1 items-center space-x-1 md:space-x-1 md:pr-0">
        <div className="flex h-8 items-center justify-center px-2 font-inst text-sm font-semibold tracking-tighter text-foreground">
          Shops
        </div>
        <Searchbar placeholder="search by name" searchFn={handleChange} />
        {table.getColumn("uid") && (
          <DataTableFacetedFilter
            column={table.getColumn("uid")}
            options={statuses}
            title=""
          />
        )}
        {/* {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="text-dyan/80 group flex h-[35px] items-center justify-center rounded-md bg-red-400/80 px-2"
          >
            <p className="text-xs text-white">Reset</p>
            <SpaceX />
          </Button>
        )} */}
      </div>
      {/* <DataTableViewOptions table={table} toolbarActions={toolbarActions} /> */}
    </div>
  );
}
