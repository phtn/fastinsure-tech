"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { type Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/ui/dropdown";
// import { RepeatIcon } from "lucide-react";
import { BeachCheckItem } from "./styles";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/index";
import { Icon } from "@/lib/icon";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  hiddenColumns?: string[];
  toolbarActions?: [boolean, VoidFunction];
}

export function DataTableViewOptions<TData>({
  table,
  hiddenColumns,
  toolbarActions,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className="flex h-9 items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ButtSqx icon={"settings-01"} size="md" onClick={() => null} />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="left"
          className="z-[250] mr-8 mt-8"
        >
          <DropdownMenuLabel className="flex h-[45px] items-center space-x-2 px-4">
            <Icon name="refresh-circle" className="size-4 stroke-[2.5px] text-cyan-50/50 -rotate-45" />
            <p className="tracking-tighter text-cyan-300/90">Toggle Columns</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-opus/20 m-0 h-[0.33px]" />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )
            .filter((column) => hiddenColumns?.includes(column.id))
            .map((column) => {
              return (
                <BeachCheckItem
                  selected={!column.getIsVisible()}
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  <span className="text-zap ml-8">{column.id}</span>
                </BeachCheckItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      {toolbarActions?.[0] ? null : (
        <ButtSqx
          size="md"
          className={cn(
            "animate-in zoom-in-0 group",
            toolbarActions ? "" : "hidden",
          )}
          onClick={toolbarActions?.[1]}
          icon={"clock"}
        />
      )}
    </div>
  );
}
