import {
  ArrowsPointingOutIcon,
  ArrowTrendingUpIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

export const SpinMX2 = () => (
  <div className="animate-fade-up relative flex size-4 items-center justify-center">
    <ArrowsPointingOutIcon className="text-dyan animate-duration-5000 absolute size-[16px] animate-spin stroke-1" />
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="animate-duration-1000 size-[18px] animate-spin stroke-1 text-amber-400/50" />
    </div>
    <div className="absolute">
      <BoltIcon className="animate-duration-2000 size-[16px] animate-spin stroke-1 text-white" />
    </div>
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="animate-duration-3000 size-[16px] animate-spin stroke-1 text-amber-400" />
    </div>
    <div className="absolute animate-pulse">
      <ArrowTrendingUpIcon className="animate-duration-700 size-[14px] animate-spin stroke-1 text-teal-400" />
    </div>
    <div className="absolute rotate-45">
      <ArrowsPointingOutIcon className="text-dyan animate-duration-5000 size-[16px] animate-spin stroke-1" />
    </div>

    <BoltIcon className="animate-duration-2000 absolute size-[60px] animate-spin stroke-1 text-white blur-lg" />
  </div>
);
