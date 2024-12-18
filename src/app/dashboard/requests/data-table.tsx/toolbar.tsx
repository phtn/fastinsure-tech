import { useCallback, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface DataToolbarProps {
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
}
export const DataToolbar = ({ searchFn, search }: DataToolbarProps) => {
  const Searchbar = useCallback(() => {
    return (
      <div className="relative w-full">
        <input
          className={cn(
            "h-8 max-w-[40ch] flex-grow rounded-md border-[0.33px] border-primary-200 pe-4 ps-7 font-jet text-xs outline-none dark:border-primary-300",
            "bg-goddess/40 shadow-inner placeholder:text-primary-500 focus:bg-goddess",
            "dark:bg-primary-100/50 dark:text-icon-dark",
          )}
          defaultValue={search}
          onChange={searchFn}
          autoFocus
        />
        <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 size-3.5 text-primary-400" />
      </div>
    );
  }, [search, searchFn]);

  return (
    <div className="z-[100] flex h-fit w-full items-center justify-between rounded-t-xl border-x-[0.33px] border-t-[0.33px] border-primary-300 bg-primary-200/70 px-2">
      <div className="flex items-center space-x-1 py-1 md:space-x-4">
        <ToolbarTitle title="All Requests" />
        <Searchbar />
      </div>
    </div>
  );
};

export interface SearchbarProps {
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ToolbarTitle = (props: { title: string }) => (
  <div className="flex h-fit items-center justify-center space-x-1.5 whitespace-nowrap px-2 font-inst text-sm font-semibold tracking-tighter text-primary-700">
    {props.title}
  </div>
);
