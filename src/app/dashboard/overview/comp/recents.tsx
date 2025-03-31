import { Tabs, Tab } from "@nextui-org/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ChatList } from "@/components/chat";

export const Recents = () => (
  <div className="w-full">
    <h2 className="absolute top-1.5 z-50 h-fit px-3 text-sm font-semibold">
      Most Recent
    </h2>
    <Tabs
      size="md"
      color="primary"
      className="absolute right-0 w-full"
      radius="none"
      isVertical={false}
      classNames={{
        tabList:
          "w-full p-0 border-b-[0.33px] border-primary data-[selected=true]:text-secondary dark:bg-army/60 dark:border-army/40 items-center flex justify-end",
        tab: "w-fit font-medium tracking-tight text-sm data-[active=true]:bg-cool",
        tabContent:
          "dark:data-[selected=true]:text-secondary dark:text-vanilla",
      }}
    >
      <Tab key={"active"} title="Active" className="size-full">
        <div className="mt-8 flex h-full w-full items-center justify-center p-6">
          <div className="flex w-full flex-col space-y-2 rounded-md border-[0.33px] border-primary-300 bg-stone-200/40 p-6">
            <div className="flex w-full items-center justify-center space-x-2 text-sm">
              <InformationCircleIcon className="size-4 shrink-0 stroke-2 text-gray-500" />
              <span className="font-medium">No record.</span>
            </div>
            <p className="text-center text-xs opacity-80">
              You have not viewed any accounts.
            </p>
          </div>
        </div>
      </Tab>
      <Tab key={"completed"} title="Completed">
        <div className="mt-8 size-full bg-void">
          <ChatList />
        </div>
      </Tab>
    </Tabs>
  </div>
);
