import {
  Toolbar,
  ToolbarSearch,
  type ToolbarSearchProps,
} from "@/ui/window/toolbar";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import { ButtStat } from "../ui/button/index";

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
      title="Dev"
      closeFn={closeFn}
      action={action}
    >
      <ButtStat value={String(len)} />
      <ToolbarSearch searchFn={searchFn} value={value} />
    </Toolbar>
  );
};

export const DevToolbar = memo(DevToolbarComponent);
