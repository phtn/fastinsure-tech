import type { TabItem } from "@/app/types";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { LoaderSm } from "@/ui/loader";
import { type HyperSelectOption } from "@/ui/select";
import { SideVaul } from "@/ui/sidevaul";
import { FlatWindow } from "@/ui/window";
import { SpToolbar, type ToolbarProps } from "@/ui/window/toolbar";
import { type SelectLog } from "@convex/logs/d";
import type { SelectUser, UserRole } from "@convex/users/d";
import {
  Image,
  Select,
  type SelectedItems,
  SelectItem,
  Tab,
  Tabs,
} from "@nextui-org/react";
import moment from "moment";
import {
  type ReactElement,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TeamContext, TeamCtx } from "./ctx";
import { opts } from "@/utils/helpers";
import { type IconName } from "@/lib/icon/types";
import { Icon } from "@/lib/icon";

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
        icon="settings-01"
        v={vx}
      />
    );
  }, [vx, toggleFn]);

  const UserConfigContent = useCallback(() => {
    return (
      <TeamContext
        uid={vx?.uid}
        currentRole={vx?.role?.split(",") as UserRole[]}
        currentComm={vx?.commission_pct}
        logs={logs}
      >
        <Body />
      </TeamContext>
    );
  }, [logs, vx]);

  return (
    <SideVaul open={open} onOpenChange={toggleFn} direction="right">
      <FlatWindow title={title} variant="god" toolbar={ConfigToolbar}>
        <div>
        <UserConfigContent />
        {/* <SideVaul.Footer>
          <FlexRow className="w-full items-center justify-end">
            <ButtSex size="sm" end={ChevronUpDownIcon}>
              <span>Advanced Settings</span>
            </ButtSex>
          </FlexRow>
        </SideVaul.Footer> */}
        </div>
      </FlatWindow>
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
          <ButtSqx icon="close" onClick={closeFn}></ButtSqx>
        </div>
      </FlexRow>
      <FlexRow className="h-10 w-full items-end px-4">
        <ButtSqx size="lg" variant="god" icon="chat-outline" />
      </FlexRow>
    </SpToolbar>
  );
};

interface TabIconProps {
  icon: IconName;
}

const Body = () => {
  const tabs = useMemo(
    () => [
      {
        id: 0,
        value: "setttings",
        label: "User Settings",
        content: <Settings />,
        icon: "settings-01",
      },
      {
        id: 1,
        value: "activity",
        label: "Activity Logs",
        content: <ActivityLogs />,
        icon: "circle-arrow-swap",
      },
    ] as (TabItem & TabIconProps)[],
    [],
  );

  return (
    <SideVaul.Body>
      <div className="flex h-[34rem] w-[28rem] flex-col">
        <Tabs
          size="sm"
          color="default"
          variant="light"
          radius="none"
          classNames={{
            tabList:
              "bg-steel/40 p-0 border-b-[0.33px] border-steel w-[28rem] overflow-scroll",
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

const TabTitle = (props: { label: string; icon: IconName }) => (
  <FlexRow className="space-x-2">
    <Icon name={props.icon} className="size-4" />
    <p className="font-inst text-xs font-medium tracking-tight">
      {props.label}
    </p>
  </FlexRow>
);

const ActivityLogs = () => {
  const { logs } = use(TeamCtx)!;
  return !logs ? (
    <LoaderSm />
  ) : logs.length === 0 ? (
    <EmptyList />
  ) : (
    <HyperList
      data={logs}
      component={LogItem}
      keyId="created_at"
      container="h-[60vh] w-full overflow-y-scroll"
    />
  );
};

const EmptyList = () => (
  <FlexRow className="h-32 items-center justify-center text-xs opacity-60">
    <Icon name="inbox-outline" className="size-4 text-steel" />
    <span>No record found.</span>
  </FlexRow>
);

const LogItem = (props: SelectLog) => {
  return (
    <FlexRow className="h-20 items-center border-b-[0.33px] border-void/50 px-4">
      <section
        className={cn(
          "size-18 flex items-center justify-center rounded-lg bg-secondary-100/60 p-1.5",
          { "bg-warning-50/30": props?.type === "logout" },
        )}
      >
        <Icon name="arrow-down-right"
          className={cn(
            "relative size-6 stroke-2 text-secondary drop-shadow-md",
            {
              "z-50 text-amber-500 rotate-180": props?.type === "logout",
            },
          )}
        />
      </section>
      <div className="flex-1 items-center space-y-1">
        <div className="flex space-x-4 items-center">
        <p className="text-xs font-inst font-semibold text-primary/80 uppercase leading-none">
          <span>{props.type}</span>
        </p>
        </div>
        <div className="flex items-end h-[18px] space-x-4 font-inst text-xs tracking-tight text-void/80">
          <div className="flex w-fit h-fit items-center space-x-1">
            <Icon name="clock" className="size-3 opacity-80" />
            <span>{moment(Number(props.created_at)).fromNow()}</span>
          </div>
          <div className="flex w-fit h-fit items-center space-x-1">
            <Icon name="map-marker-fill" className="size-3 opacity-50" />
            <span>Makati</span>
          </div>
        </div>
      </div>
    </FlexRow>
  );
};

const Settings = () => {
  const {
    roleSelected,
    currentRole,
    currentComm,
    commissionPct,
    updateRole,
    updateCommPct,
    loading,
    isDone,
  } = use(TeamCtx)!;
  // const SettingFnComponent = useCallback(
  //   () => (
  //     <ButtSex inverted size="lg" className="flex">
  //       <div className="w-[12rem] px-4">Select Component</div>
  //     </ButtSex>
  //   ),
  //   [],
  // );

  const settings_data = useMemo(
    () => [
      {
        title: "User Access Roles",
        description:
          "Access Roles provides role-based access management and ensures that users have appropriate permissions within your team.",
        value: currentRole?.join(","),
        component: <UserRoleSelect />,
        saveFn: updateRole,
        isModified: roleSelected !== "",
        newValue: roleSelected,
        loading,
        isDone,
        icon: "key-outline",
      },
      {
        title: "Commission Rate",
        description: "You can configure your agent's commission rate here. ",
        value: currentComm ?? 0,
        component: <CommPctComponent />,
        saveFn: updateCommPct,
        isModified:
          commissionPct !== 0 && commissionPct !== Number(currentComm),
        newValue: isDone ? commissionPct : currentComm,
        loading,
        isDone,
        icon: "percentage",
      },
      // {
      //   title: "Group Assignment",
      //   component: <SettingFnComponent />,
      //   saveFn: updateRole,
      //   newValue: "",
      //   isModified: false,
      //   loading,
      //   isDone: false,
      //   icon: PercentIcon,
      // },
      // {
      //   title: "Branch Assignment",
      //   component: <SettingFnComponent />,
      //   saveFn: updateRole,
      //   newValue: "",
      //   isModified: false,
      //   loading,
      //   isDone: false,
      //   icon: PercentIcon,
      // },
    ] as UserSetting[],
    [
      // SettingFnComponent,
      currentRole,
      currentComm,
      updateRole,
      roleSelected,
      isDone,
      loading,
      commissionPct,
      updateCommPct,
    ],
  );

  return (
    <HyperList
      keyId="title"
      data={settings_data}
      itemStyle="rounded-lg"
      component={SettingsItem}
      disableAnimation={true}
      container="px-2 pt-8 space-y-12 pb-20 bg-steel/15 h-[60vh] w-full overflow-y-scroll"
    />
  );
};

interface UserSetting {
  title: string;
  description?: string;
  value?: string | number | undefined;
  newValue: string | number | undefined;
  component: ReactElement;
  saveFn: () => Promise<void>;
  isModified: boolean;
  loading: boolean;
  isDone: boolean;
  icon: IconName;
}
const SettingsItem = (props: UserSetting) => {
  const { title, icon, isModified, isDone, loading, value, newValue, saveFn } =
    props;

  const SaveOptions = useCallback(() => {
    const options = opts(
      <ButtSex variant="secondary" onClick={saveFn} loading={loading}>
        Save changes
      </ButtSex>,
      <ButtSqx disabled icon={icon} />,
    );
    return <>{options.get(isModified)}</>;
  }, [loading, icon, saveFn, isModified]);

  return (
    <div className="h-[20rem] w-full overflow-hidden rounded-lg border-[0.33px] border-icon bg-chalk py-2 shadow-md">
      <section className="flex h-3/4 flex-col justify-start px-4">
        <FlexRow className="flex h-2/5 items-center justify-between pt-2">
          <header className="font-inst text-lg font-medium tracking-tight">
            {title}
          </header>
          <SaveOptions />
        </FlexRow>
        <FlexRow className="h-2/5 w-full items-start rounded-md bg-gradient-to-b from-steel/5 to-transparent px-1.5 py-1">
          <p className="text-sm font-light leading-5">{props.description}</p>
        </FlexRow>
        <FlexRow className="_border mb-4 h-1/5 w-full items-center justify-between gap-4 rounded-lg border-secondary bg-secondary-100/60 px-3 text-secondary">
          <p className="font-inst text-sm font-semibold text-void">
            Current value
          </p>
          <p className="font-inter text-sm font-semibold uppercase tracking-wide drop-shadow-md">
            {isDone ? newValue : value}
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

const UserRoleSelect = () => {
  const { roles, roleSelected, onRoleSelect } = use(TeamCtx)!;

  return (
    <Select
      isMultiline
      items={roles}
      label="Select Access Role"
      className="z-[200] w-[16rem] rounded-lg border-[0.33px] border-steel bg-goddess"
      selectedKeys={[roleSelected]}
      onChange={onRoleSelect}
      renderValue={(options: SelectedItems<HyperSelectOption>) =>
        options.map((option) => (
          <FlexRow
            key={option.data?.id}
            className="mt-2 items-center capitalize"
          >
            <div
              className={cn(
                "flex size-5 items-center justify-center space-x-4 rounded-md bg-gray-400/20 uppercase text-gray-500 drop-shadow-sm",
                option.data?.color,
              )}
            >
              <span className="text-sm font-bold capitalize">
                {option.data?.value.substring(0, 1)}
              </span>
            </div>
            <span className="font-inst">{option.data?.value}</span>
          </FlexRow>
        ))
      }
    >
      {(
        option, // SELECTED ITEM
      ) => (
        <SelectItem
          key={option.value}
          textValue={roleSelected}
          className="data-[hover=true]:bg-steel/10"
          classNames={{
            wrapper: "border bg-chalk",
            base: "py-2 pointer-events-auto",
          }}
        >
          <FlexRow className="items-center capitalize">
            <div
              className={cn(
                "flex size-5 items-center justify-center space-x-4 rounded-md bg-gray-400/20 uppercase text-gray-500 drop-shadow-sm",
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

const CommPctComponent = () => {
  const { setPercentage, setPctValue, commissionPct } = use(TeamCtx)!;

  const [inputVal, setInputVal] = useState(String(commissionPct));

  const suggestions = [10, 15, 20, 30];

  useEffect(() => {
    setInputVal(commissionPct.toString());
  }, [commissionPct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputVal(value);
    if (value && !isNaN(parseFloat(value))) {
      setPercentage(parseFloat(value));
    }
  };
  return (
    <FlexRow className="h-fit items-center space-x-2 px-1">
      <div className="flex">
        {suggestions.map((pct) => (
          <ButtSex
            key={pct}
            onClick={setPctValue(pct)}
            size="md"
            inverted={+commissionPct === pct}
          >
            {pct}
            <span className="text-[8px]">%</span>
          </ButtSex>
        ))}
      </div>
      <div className="relative ml-2 w-full">
        <input
          className="h-[38px] w-20 shrink-0 rounded-lg border-[0.33px] border-primary-300/100 bg-primary-100/50 pe-3 text-right"
          value={inputVal}
          onChange={handleInputChange}
        />
        <span className="absolute left-3 top-3 text-xs text-adam">%</span>
      </div>
    </FlexRow>
  );
};
