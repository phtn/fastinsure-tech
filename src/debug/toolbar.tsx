import {
  Toolbar,
  ToolbarSearch,
  type ToolbarSearchProps,
} from "@/ui/window/toolbar";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { ButtStat } from "../ui/button/index";
import { FlexRow } from "@/ui/flex";

interface DevToolbarProps extends ToolbarSearchProps {
  closeFn: VoidFunction;
  value?: string;
  len: number;
  loading?: boolean;
  action?: VoidFunction;
}
const DevToolbarComponent = (props: DevToolbarProps) => {
  const { closeFn, value, searchFn, len, loading, action } = props;

  return (
    <Toolbar
      icon={CommandLineIcon}
      loading={loading}
      closeFn={closeFn}
      action={action}
      title="Dev"
    >
      <ToolbarSearch searchFn={searchFn} value={value} />
      <FlexRow className="w-fit items-center gap-1 px-4 text-xs font-medium text-icon dark:text-icon-dark">
        <ButtStat size="sm" value={String(len)} />
        <span>items</span>
      </FlexRow>
    </Toolbar>
  );
};

export const DevToolbar = memo(DevToolbarComponent);
