import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Button, Tab, Tabs } from "@nextui-org/react";

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
          <p className="text-xl font-bold">{props.name}</p>
          <Button
            variant="flat"
            color="secondary"
            size="sm"
            className="space-x-0.5"
          >
            <CheckBadgeIcon className="size-4 text-foreground" />
            <p className="text-foreground">
              {props.verified ? "Verified" : "Get verified"}
            </p>
          </Button>
        </div>
        <div className="font-jet text-xs">@{props.group_code}</div>
      </div>
    </div>
  );
};

export const TabComponent = () => (
  <Tabs size="md" color="primary" variant="underlined">
    <Tab key={"activity"} title="Activity">
      <div className="h-96 w-full bg-void" />
    </Tab>
    <Tab key={"messages"} title="Messages">
      <div className="size-10 bg-primary" />
    </Tab>
    <Tab key={"tools"} title="Tools">
      <div className="size-full bg-primary" />
    </Tab>
    <Tab key={"notifications"} title="Notifications">
      <div className="size-10 bg-primary" />
    </Tab>
    <Tab key={"settings"} title="Settings">
      <div className="size-10 bg-primary" />
    </Tab>
  </Tabs>
);
