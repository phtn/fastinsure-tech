import { Tab, Tabs } from "@nextui-org/react";
import { Building2 } from "lucide-react";

interface AccountDetailProps {
  name: string | undefined;
  group_code: string | undefined;
  verified: boolean | undefined;
}
export const AccountSummary = (props: AccountDetailProps) => {
  return (
    <div className="h-32 w-full p-6">
      <div className="h-full w-full p-2">
        <div className="flex items-center space-x-4 py-2">
          <p className="text-xl font-inst tracking-tight font-bold">{props.name}</p>
        </div>
        <div className="flex items-center tracking-wide space-x-1 font-jet text-xs">
          <Building2 className="size-3" />
          <span>{props.group_code}</span>
        </div>
      </div>
    </div>
  );
};

export const TabComponent = () => (
  <Tabs classNames={{
    tabList: "ps-4 font-inst"
  }} size="md" color="primary" variant="underlined">
    <Tab key={"activity"} title="Activity">
      <div className="h-full w-full p-6 text-xs opacity-60">
        No recent activity.
      </div>
    </Tab>
    <Tab key={"settings"} title="Settings">
      <div className="h-full w-full p-6 text-xs opacity-60">
        This component will be ready soon.
      </div>
    </Tab>
  </Tabs>
);
