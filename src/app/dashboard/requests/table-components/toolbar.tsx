import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ButtSex } from "@/ui/button/ripple";

interface DataToolbarProps {
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  count: number;
}
export const DataToolbar = ({ searchFn, search, count }: DataToolbarProps) => {
  const [searchValue, setSearchValue] = useState(search);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resetSearch = () => {
    setSearchValue("");
    search = ""
  };
  const handleSearchSubmitted = () => {
    setSearchValue("submitted")
    search="submitted"
  }
  const Searchbar = useCallback(() => {
    return (
      <div className="relative w-full px-5">
        <input
          ref={searchInputRef}
          className={cn(
            "h-8 max-w-[40ch] flex-grow rounded-md border-[0.33px] border-primary-400 pe-4 ps-7 font-jet text-xs outline-none dark:border-primary-300",
            "bg-chalk/90 shadow-inner placeholder:text-primary-500 focus:bg-goddess",
            "dark:bg-primary-100/50 dark:text-icon-dark",
          )}
          defaultValue={searchValue }
          onChange={searchFn}
          autoFocus
        />
        <MagnifyingGlassIcon className="absolute left-6 top-2 size-4 text-primary-500" />
      </div>
    );
  }, [searchFn, searchValue]);

  return (
    <div className="z-[100] flex h-fit w-full items-center justify-between rounded-t-xl px-2 md:px-5">
      <div className="flex items-center w-full space-x-3 pb-2">
        <div className="from-army/30 via-vanilla/40 h-6 w-6 flex-shrink-0 justify-center border-[0.33px] border-primary-400 text-xs to-macd-gray/25 flex items-center rounded-lg bg-gradient-to-br">
          {count}
        </div>
        <ToolbarTitle title={`Items`} />
        <Searchbar />
        <div className="flex items-center space-x-3 w-fit">
        <ButtSex size="sm" onClick={resetSearch} inverted={searchValue === ""} className="">All</ButtSex>
        <ButtSex size="sm" onClick={handleSearchSubmitted} inverted={searchValue === "submitted"} className="">Submitted</ButtSex>
        </div>
        {/* <Button size="sm" color="secondary"><span className="px-2">Submitted</span></Button> */}
      </div>
    </div>
  );
};

export interface SearchbarProps {
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ToolbarTitle = (props: { title: string }) => (
  <div className="flex h-fit items-center justify-center whitespace-nowrap font-inst text-sm font-semibold tracking-tighter text-primary">
    {props.title}
  </div>
);
