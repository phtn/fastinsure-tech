import { type Column } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown";
import {
  ArrowDown01Icon,
  ArrowUp10Icon,
  EyeOffIcon,
  ListFilterIcon,
} from "lucide-react";
import { type ReactElement } from "react";
import { cn } from "@/lib/utils";
import { BeachDrop, BeachDropItem } from "./styles";
import { Button } from "@nextui-org/react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title?: string;
  element?: ReactElement;
}

const defaultStyle =
  "flex w-full items-center py-1 m-0 font-mono text-xs font-medium tracking-tight text-foreground";

export function ColumnHeader<TData, TValue>({
  className,
  column,
  element,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn(defaultStyle, className)}>
        {title ?? element}
      </div>
    );
  }

  return (
    <div className={cn(defaultStyle, className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            radius="sm"
            className="rgoup group h-7 w-fit space-x-1 border-0 bg-transparent hover:bg-transparent/10 dark:hover:bg-primary-100"
          >
            <span className="font-inst text-xs font-medium tracking-tight text-icon group-hover:text-primary dark:text-icon-dark">
              {title}
            </span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown01Icon className="size-3.5 text-emerald-500" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp10Icon className="size-3.5 text-indigo-500" />
            ) : (
              <ListFilterIcon className="size-3.5 text-secondary" />
            )}{" "}
          </Button>
        </DropdownMenuTrigger>
        <BeachDrop align={"start"}>
          <BeachDropItem
            selected={column.getIsSorted() === "asc"}
            onClick={() => column.toggleSorting(false)}
            className={column.getIsSorted() === "asc" ? `bg-cyan-700/10` : ``}
          >
            <ArrowUp10Icon className="mr-2 size-3.5 text-indigo-300" />

            <span className="text-indigo-300">Asc</span>
          </BeachDropItem>
          <BeachDropItem
            selected={column.getIsSorted() === "desc"}
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDown01Icon className="mr-2 size-3.5 text-teal-300" />
            <span className="text-teal-300">Desc</span>
          </BeachDropItem>
          <DropdownMenuSeparator />
          <BeachDropItem
            selected={column.getIsVisible() === false}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOffIcon className="text-zap mr-2 size-3.5" />
            <span className="text-zap">Hide</span>
          </BeachDropItem>
        </BeachDrop>
      </DropdownMenu>
    </div>
  );
}
