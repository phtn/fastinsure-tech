import type { ClassName, DualIcon } from "@/app/types";
import type { ReactNode } from "react";

export const StatPanel = (props: {
  title: string;
  tag?: string;
  icon: DualIcon;
  className?: ClassName;
  children?: ReactNode;
}) => {
  return (
    <div className="bg-zap text-coal flex h-[130px] w-full flex-col rounded-xl border-[0.33px] border-neutral-400 p-4 shadow-lg">
      <div className="flex h-full w-full justify-between">
        <div>
          <div className="leading-2 font-medium tracking-tight text-neutral-800">
            {props.title}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-tight text-neutral-400">
            {props.tag}
          </div>
        </div>
        <div>
          <props.icon className="size-6 stroke-1 text-neutral-500" />
        </div>
      </div>

      {props.children}
    </div>
  );
};

export const StatPanelContent = (props: {
  statValue: string | number | undefined;
  statKey?: string | undefined;
}) => {
  return (
    <div className="flex w-full items-center justify-end self-baseline text-2xl font-semibold tracking-tight">
      <div className="flex w-full flex-col items-end">
        <div className="animate-enter">{props.statValue}</div>
        <div className="text-xs font-light opacity-80">{props.statKey}</div>
      </div>
    </div>
  );
};
