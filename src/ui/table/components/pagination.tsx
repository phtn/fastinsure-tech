import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { type Table } from "@tanstack/react-table";

import { Select, SelectTrigger, SelectValue } from "@/ui/select";
import { BeachSelect, BeachSelectItem } from "./styles";
import { ButtSqx } from "@/ui/button/";
import { type ReactNode } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  children?: ReactNode;
}

const sizes = [10, 20, 30, 40, 50];

export function DataTablePagination<TData>({
  table,
  children,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex h-fit w-fit items-center">
      <div className="flex w-full items-center justify-between lg:space-x-4">
        <div className="flex items-center space-x-4 portrait:space-x-2">
          {children}
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value: string) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="flex h-6 w-fit items-center rounded-md border-[0.33px] border-primary-200 bg-god px-2 dark:bg-primary-100/50 portrait:w-fit">
              <SelectValue
                className="text-xs"
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <BeachSelect side="bottom">
              {sizes.map((pageSize) => (
                <BeachSelectItem
                  selected={pageSize === table.getState().pagination.pageSize}
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </BeachSelectItem>
              ))}
            </BeachSelect>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center whitespace-nowrap font-inst text-xs font-medium text-icon opacity-50 dark:text-icon-dark">
          {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-1 sm:px-0 md:space-x-2">
          <ButtSqx
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            icon={ChevronDoubleLeftIcon}
            id="go_to_first_page"
          />
          <ButtSqx
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={ChevronLeftIcon}
            id="go_to_previous_page"
          />
          <ButtSqx
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={ChevronRightIcon}
            id="go_to_next_page"
          />
          <ButtSqx
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            icon={ChevronDoubleRightIcon}
            id="go_to_last_page"
          />
        </div>
      </div>
    </div>
  );
}
