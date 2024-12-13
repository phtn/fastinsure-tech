import type { DualIcon, TabItem } from "@/app/types";
import { ButtSqx } from "@/ui/button/button";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { SideVaul } from "@/ui/sidevaul";
import { Window } from "@/ui/window";
import { SpToolbar, type ToolbarProps } from "@/ui/window/toolbar";
import { type SelectUser } from "@convex/users/d";
import {
  ArrowTrendingUpIcon,
  CogIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Image, Tab, Tabs } from "@nextui-org/react";
import { UserCog2 } from "lucide-react";
import { useCallback, useMemo } from "react";

interface UserConfigProps {
  open: boolean;
  toggleFn: VoidFunction;
  title: string;
  vx: SelectUser | undefined;
}
export const UserConfig = ({ vx, open, toggleFn, title }: UserConfigProps) => {
  const ConfigToolbar = useCallback(() => {
    return (
      <ToolbarComponent
        title={vx?.nickname ?? vx?.email}
        closeFn={toggleFn}
        icon={UserCog2}
        v={vx}
      ></ToolbarComponent>
    );
  }, [vx, toggleFn]);
  return (
    <SideVaul open={open} onOpenChange={toggleFn} direction="right">
      <Window title={title} variant="god" toolbar={ConfigToolbar}>
        <Body />
        <SideVaul.Footer>
          <ButtSex size="sm">{vx?.nickname}</ButtSex>
        </SideVaul.Footer>
      </Window>
    </SideVaul>
  );
};

const ToolbarComponent = ({ closeFn, v }: ToolbarProps<SelectUser>) => {
  return (
    <SpToolbar description="" closeFn={closeFn} variant="god" size="xl">
      <FlexRow className="h-full items-start justify-between">
        <FlexRow className="w-full items-center border p-2">
          <Image
            alt={`avatar-of-${v?.nickname}`}
            src={v?.photo_url}
            className="size-16"
            isBlurred
          />
          <div className="block space-y-2">
            <h1 className="max-w-[30ch] overflow-x-scroll text-lg font-semibold capitalize leading-none tracking-tight text-primary">
              {v?.nickname}
            </h1>
            <h2 className="font-inst text-sm leading-none tracking-tight text-blue-500 dark:text-secondary">
              {v?.email}
            </h2>
          </div>
        </FlexRow>
        <div className="size-[3rem]">
          <ButtSqx icon={XMarkIcon} onClick={closeFn}></ButtSqx>
        </div>
      </FlexRow>
      <FlexRow className="h-16 items-end px-4">
        <ButtSqx size="lg" variant="god" icon={ChatBubbleLeftRightIcon} />
      </FlexRow>
    </SpToolbar>
  );
};

interface TabIconProps {
  icon: DualIcon;
}

const Body = () => {
  const tabs: (TabItem & TabIconProps)[] = useMemo(
    () => [
      {
        id: 0,
        value: "activity",
        label: "Activity Logs",
        content: <TabContent />,
        icon: ArrowTrendingUpIcon,
      },
      {
        id: 1,
        value: "setttings",
        label: "User Settings",
        content: <TabContent />,
        icon: CogIcon,
      },
    ],
    [],
  );

  return (
    <SideVaul.Body>
      <div className="flex h-[30rem] w-[28rem] border border-primary-300/30">
        <Tabs
          size="sm"
          color="default"
          variant="light"
          classNames={{
            tabList:
              "bg-slate-300 pt-0.5 rounded-none w-[28rem] overflow-scroll",
            tab: "rounded-md h-[32px]",
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              title={<TabTitle label={tab.label} icon={tab.icon} />}
            >
              {tab.content}
            </Tab>
          ))}
        </Tabs>
      </div>
    </SideVaul.Body>
  );
};

const TabTitle = (props: { label: string; icon: DualIcon }) => (
  <FlexRow className="space-x-2">
    <props.icon className="size-4" />
    <p className="font-inst text-xs font-medium tracking-tight">
      {props.label}
    </p>
  </FlexRow>
);

const TabContent = () => <div className="size-96" />;
