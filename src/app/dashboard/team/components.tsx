import type { DualIcon, TabItem } from "@/app/types";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { LoaderSm } from "@/ui/loader";
import { type HyperSelectOption, type HyperSelectProps } from "@/ui/select";
import { SideVaul } from "@/ui/sidevaul";
import { Window } from "@/ui/window";
import { SpToolbar, type ToolbarProps } from "@/ui/window/toolbar";
import { type SelectLog } from "@convex/logs/d";
import { type SelectUser } from "@convex/users/d";
import {
  ArrowDownRightIcon,
  ArrowTrendingUpIcon,
  ChevronUpDownIcon,
  CogIcon,
  EllipsisHorizontalIcon,
  InboxIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ClockIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import {
  Image,
  Select,
  type SelectedItems,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { UserCog2 } from "lucide-react";
import moment from "moment";
import {
  type ChangeEvent,
  type ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";

interface UserConfigProps {
  open: boolean;
  toggleFn: VoidFunction;
  title: string;
  vx: SelectUser | undefined;
  logs: SelectLog[] | null;
}
export const UserConfig = ({
  vx,
  open,
  toggleFn,
  title,
  logs,
}: UserConfigProps) => {
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
        <Body logs={logs} />
        <SideVaul.Footer>
          <FlexRow className="w-full items-center justify-end">
            <ButtSex size="sm" end={ChevronUpDownIcon}>
              <span>Advanced Settings</span>
            </ButtSex>
          </FlexRow>
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
      <FlexRow className="h-16 w-full items-end px-4">
        <ButtSqx size="lg" variant="god" icon={ChatBubbleLeftRightIcon} />
      </FlexRow>
    </SpToolbar>
  );
};

interface TabIconProps {
  icon: DualIcon;
}

interface BodyProps {
  logs: SelectLog[] | null;
}
const Body = ({ logs }: BodyProps) => {
  const tabs: (TabItem & TabIconProps)[] = useMemo(
    () => [
      {
        id: 0,
        value: "setttings",
        label: "User Settings",
        content: <SettingsContent />,
        icon: CogIcon,
      },
      {
        id: 1,
        value: "activity",
        label: "Activity Logs",
        content: <ActivityLogs data={logs} />,
        icon: ArrowTrendingUpIcon,
      },
    ],
    [logs],
  );

  return (
    <SideVaul.Body>
      <div className="flex h-[30rem] w-[28rem] flex-col">
        <Tabs
          size="sm"
          color="default"
          variant="light"
          radius="none"
          classNames={{
            tabList:
              "bg-steel/40 p-0 border-b-[0.33px] border-steel/50 w-[28rem] overflow-scroll",
            tab: "h-[34px]",
            panel: "p-0",
          }}
          defaultSelectedKey={"settings"}
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

const ActivityLogs = (props: { data: SelectLog[] | null }) => {
  if (!props.data) return <LoaderSm />;
  if (props.data.length === 0)
    return (
      <FlexRow className="h-32 items-center justify-center text-xs opacity-60">
        <InboxIcon className="size-4 text-steel" />
        <span>No record found.</span>
      </FlexRow>
    );
  return (
    <div className="h-[60vh] w-full overflow-scroll">
      <HyperList data={props.data} component={LogItem} keyId="created_at" />
    </div>
  );
};

const LogItem = (props: SelectLog) => {
  return (
    <FlexRow className="h-20 items-center border-b-[0.33px] border-void/50 px-4">
      <section
        className={cn(
          "size-18 flex items-center justify-center rounded-lg bg-secondary-100/60 p-1.5",
          { "bg-warning-50/50": props?.type === "logout" },
        )}
      >
        <ArrowDownRightIcon
          className={cn(
            "relative size-6 stroke-2 text-secondary drop-shadow-md",
            {
              "z-50 text-amber-500 rotate-180": props?.type === "logout",
            },
          )}
        />
      </section>
      <div className="flex-1 items-center space-y-1">
        <p className="text-xs font-medium uppercase leading-none">
          <span className="font-jet">{props.type}</span>
        </p>
        <div className="flex items-center space-x-4 font-inst text-xs tracking-tight text-void/80">
          <FlexRow className="w-fit items-center space-x-1">
            <ClockIcon className="size-3.5 opacity-50" />
            <span>{moment(Number(props.created_at)).fromNow()}</span>
          </FlexRow>
          <FlexRow className="w-fit items-center space-x-1">
            <MapPinIcon className="size-3.5 opacity-50" />
            <span>Makati</span>
          </FlexRow>
        </div>
      </div>
    </FlexRow>
  );
};

const SettingsContent = () => {
  const SettingFnComponent = useCallback(
    () => (
      <ButtSex inverted size="lg" className="flex">
        <div className="w-[12rem] px-4">Select Component</div>
      </ButtSex>
    ),
    [],
  );

  const user_access_roles: HyperSelectOption[] = useMemo(
    () => [
      {
        id: 0,
        value: "agent",
        color: "bg-warning-400/20 text-amber-500",
      },
      {
        id: 2,
        value: "underwriter",
        color: "bg-indigo-100 text-indigo-600",
      },
      {
        id: 3,
        value: "supervisor",
        color: "bg-sky-100 text-sky-600",
      },
      {
        id: 4,
        value: "manager",
        color: "bg-slate-400/20 text-slate-950",
      },
    ],
    [],
  );

  // const UserAccessRolesFnComponent = useCallback(
  //   () => (
  //     <HyperSelect
  //       options={user_access_roles}
  //       label="user access roles"
  //       id="user-access-roles"
  //     />
  //   ),
  //   [user_access_roles],
  // );

  const settings_data: UserSetting[] = useMemo(
    () => [
      {
        title: "User Access Roles",
        description:
          "Access Roles provides role-based access management and ensures that users have appropriate permissions within your team.",
        component: (
          <UserRoleSelect id="user-role" options={user_access_roles} />
        ),
      },
      {
        title: "Commission Rate",
        component: <SettingFnComponent />,
      },
      {
        title: "Group Assignment",
        component: <SettingFnComponent />,
      },
      {
        title: "Branch Assignment",
        component: <SettingFnComponent />,
      },
    ],
    [SettingFnComponent, user_access_roles],
  );
  return (
    <div className="">
      <HyperList
        data={settings_data}
        container="px-2 pt-8 space-y-12 pb-20 bg-steel/15 h-[50vh] w-full overflow-y-scroll"
        component={SettingsItem}
        keyId="title"
      />
    </div>
  );
};

interface UserSetting {
  title: string;
  description?: string;
  value?: string | number | undefined;
  component: ReactElement;
}
const SettingsItem = (props: UserSetting) => {
  return (
    <div className="h-80 w-full rounded-lg border-[0.33px] border-icon bg-chalk py-2 shadow-md">
      <section className="flex h-3/4 flex-col justify-start px-4">
        <FlexRow className="flex h-2/5 items-center justify-between">
          <header className="font-inst text-lg font-medium tracking-tight">
            {props.title}
          </header>
          <ButtSqx icon={EllipsisHorizontalIcon} />
        </FlexRow>
        <FlexRow className="h-2/5 w-full items-start rounded-md bg-steel/5 px-1.5 py-1">
          <p className="text-sm font-light leading-5">{props.description}</p>
        </FlexRow>
        <FlexRow className="my-2 h-1/5 w-full items-center justify-between gap-4 rounded-lg border border-secondary bg-secondary px-3 text-chalk">
          <p className="font-inst text-sm font-semibold">Current value</p>
          <p className="font-inst font-semibold tracking-wide text-white drop-shadow-md">
            10%
          </p>
        </FlexRow>
      </section>

      <FlexRow className="h-1/4 w-full items-center justify-between px-3">
        <p className="px-4 font-inst text-sm font-medium text-icon">𝒇(𝒙)</p>
        <div>{props.component}</div>
      </FlexRow>
    </div>
  );
};

// const TabContent = (props: { title: string }) => (
//   <FlexRow className="h-32 items-center justify-center text-xs opacity-60">
//     {props.title}
//   </FlexRow>
// "bg-indigo-400/20 text-indigo-500"
// "bg-purple-400/20 text-purple-500"
// "bg-rose-400/20 text-rose-500"
// );

const UserRoleSelect = ({ options }: HyperSelectProps) => {
  const [value, setValue] = useState<string>("");

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  return (
    <Select
      items={options}
      isMultiline
      label="Select Access Role"
      className="z-[200] w-[16rem] rounded-lg border-[0.33px] border-steel bg-goddess"
      selectedKeys={[value]}
      onChange={handleSelectionChange}
      renderValue={(options: SelectedItems<HyperSelectOption>) =>
        options.map((option) => (
          <FlexRow
            key={option.data?.id}
            className="mt-2 items-center capitalize"
          >
            <div
              className={cn(
                "flex size-5 items-center justify-center space-x-4 rounded-md bg-gray-400/20 uppercase text-gray-500",
                option.data?.color,
              )}
            >
              <span className="text-xs font-bold capitalize">
                {option.data?.value.substring(0, 1)}
              </span>
            </div>
            <span className="font-inst">{option.data?.value}</span>
          </FlexRow>
        ))
      }
    >
      {(option) => (
        <SelectItem
          key={option.value}
          textValue={value}
          className="data-[hover=true]:bg-steel/15"
          classNames={{
            wrapper: "border bg-chalk",
            base: "py-2 pointer-events-auto",
          }}
        >
          <FlexRow className="items-center capitalize">
            <div
              className={cn(
                "flex size-5 items-center justify-center space-x-4 rounded-md bg-gray-400/20 uppercase text-gray-500",
                option.color,
              )}
            >
              <span className="text-xs font-bold capitalize">
                {option.value.substring(0, 1)}
              </span>
            </div>
            <span className="font-inst">{option.value}</span>
          </FlexRow>
        </SelectItem>
      )}
    </Select>
  );
};
