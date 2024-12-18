import { ArrowPathIcon, BoltIcon } from "@heroicons/react/24/outline";
import { MinusCircleIcon } from "@heroicons/react/24/solid";
export const SpinMX2 = () => (
  <div className="animate-fade-up relative flex size-4 items-center justify-center">
    {/* <ArrowsPointingOutIcon className="absolute size-[16px] animate-spin stroke-1 text-secondary duration-5000" /> */}
    {/* <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="size-[18px] animate-spin stroke-1 text-amber-400/50 duration-1000" />
    </div> */}
    <div className="absolute flex items-center justify-center">
      <MinusCircleIcon className="size-[4px] animate-spin text-secondary duration-2000 dark:text-warning-100" />
    </div>
    <div className="absolute animate-pulse">
      <BoltIcon className="size-[10px] animate-spin text-secondary-100 duration-2000" />
    </div>
    <div className="absolute animate-pulse">
      <ArrowPathIcon className="size-[18px] animate-spin stroke-1 text-blue-600 duration-4000 dark:text-warning-300" />
    </div>
    {/* <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="animate-duration-700 size-[14px] animate-spin stroke-1 text-teal-400" />
    </div> */}
    {/* <div className="absolute rotate-45">
      <ArrowsPointingOutIcon className="size-[16px] animate-spin stroke-1 text-success duration-5000" />
    </div> */}

    <BoltIcon className="absolute size-[12px] animate-spin stroke-1 text-warning-300 blur-sm duration-2000" />
  </div>
);
