import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type GlobalFilterTableState,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  GlobalFilterColumn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/ui/table/table";
import { EmptyRequestTable, LoadingTable } from "./empty";
import { Toolbar } from "./toolbar";
import { type PropsWithChildren, useState } from "react";
import { PhCell } from "@/ui/table/components/styles";
import { fuzzyFilter } from "@/ui/table/utils";
import { DataTablePagination } from "@/ui/table/components/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  toolbarActions: [boolean, VoidFunction];
}

interface GlobalFilter {
  globalFilter: string | number | boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  toolbarActions,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobarFilter] = useState<GlobalFilter>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<TData>({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnVisibility: {
        agentId: false,
      },
      rowSelection,
      columnFilters,
      globalFilter,
      // globalFilter: ["uid"],
    },
    enableRowSelection: true,
    onGlobalFilterChange: setGlobarFilter,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <TableContainer>
      <Toolbar table={table} toolbarActions={toolbarActions} />
      <TableInner>
        <Table>
          <TableHeader className="sticky">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-r-[0.33px] border-pink-500"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className=""
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.getValue("id")}>
                  {row.getVisibleCells().map((cell) => (
                    <PhCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </PhCell>
                  ))}
                </TableRow>
              ))
            ) : loading ? (
              <LoadingTable colSpan={columns.length} />
            ) : (
              <EmptyRequestTable colSpan={columns.length} loading={loading} />
            )}
          </TableBody>
        </Table>
      </TableInner>
      <DataTablePagination table={table} />
    </TableContainer>
  );
}
const TableContainer = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full overflow-scroll">{children}</div>
);

const TableInner = ({ children }: PropsWithChildren) => (
  <div className="h-fit pb-24">{children}</div>
);
