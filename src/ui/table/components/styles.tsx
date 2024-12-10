import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/ui/dropdown";
import { PopoverContent } from "@/ui/popover";
import { CommandItem } from "@/ui/command";
import { SelectContent, SelectItem } from "@/ui/select";

import { TableCell, TableHeader } from "../table";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import tw from "tailwind-styled-components";
import { Button } from "@nextui-org/react";

export const PhHeader = tw(TableHeader)`a
   sticky bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-cyan-200/40 via-orange-50 font-medium tracking-tight shadow-sm shadow-stone-100
   `;
export const PhCell = tw(TableCell)`
  p-0 font-light text-foreground
 `;

export const content = `
  rounded-md p-0 portrait:w-screen
  `;

const item = `
  h-[36px] rounded-md cursor-pointer
  font-jet text-xs text-foreground font-medium
  transition-colors duration-200 ease-in-out
  hover:bg-slate-900/50
  `;

type SelectedItem = {
  selected: boolean;
};

export const Beach = tw(PopoverContent)`
  ${(_) => content}
  `;

export const BeachItem = tw(CommandItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-foreground" : "")}
  `;

export const BeachDrop = tw(DropdownMenuContent)`
  ${(_) => content}
  -mr-[px] mt-[0.33px] w-fit z-[200]
  `;

export const BeachDropItem = tw(DropdownMenuItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-slate-900/20" : "")}
  `;

export const BeachCheckItem = tw(DropdownMenuCheckboxItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? " bg-cyan-700/5" : "")}
  mx-2
  `;

export const BeachSelect = tw(SelectContent)`
  ${(_) => content}
  `;

export const BeachSelectItem = tw(SelectItem)<SelectedItem>`
  ${({ selected }) => item + (selected ? "" : "")}
  `;

export const SpaceX = () => (
  <X
    className={cn(
      "",
      "animate-in hidden size-0 text-white",
      "transition-all duration-300 ease-in-out",
      "group-hover:ml-2 group-hover:size-4",
      "group-hover:flex group-hover:rotate-90",
    )}
  />
);

export const ActiveOptions = tw(Button)`
  hover:bg-neutral-300/20
  h-[12px] border-[0.33px] border-transparent mx-0 px-1 text-xs text-foreground
  data-[state=open]:backdrop-blur-lg

  data-[state=open]:bg-ash

  data-[state=open]:rounded-full
  data-[state=open]:shadow-inner

  data-[state=open]:text-coal

  transition-all duration-200
  `;
