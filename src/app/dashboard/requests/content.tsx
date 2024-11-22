"use client";

import { Button, Tab, Tabs } from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { CircleHelpIcon } from "lucide-react";
import {
  type Key,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
  type PropsWithChildren,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { guid } from "@/utils/helpers";

export interface RequestTabItem {
  id: string | number;
  value: Key;
  label: string;
  href: string;
  content: ReactElement;
  // content: ReactElement | MemoExoticComponent<() => ReactElement>;
}

export const RequestTabs = ({ children }: PropsWithChildren) => {
  const pathname = usePathname().split("/")[3];
  const [selected, setSelected] = useState<string>(pathname!);
  const router = useRouter();

  const handleCreateNewRequest = useCallback(() => {
    const request_id = guid();
    router.push(`/dashboard/request/create?rid=${request_id}`);
  }, [router]);

  const tabs: RequestTabItem[] = useMemo(
    () => [
      {
        id: 0,
        href: "",
        value: "/requests",
        label: "All",
        content: <TabContent />,
      },
      {
        id: 3,
        href: "",
        value: "/requests/submitted",
        label: "Submitted",
        content: <TabContent />,
      },

      {
        id: 4,
        href: "/completed",
        value: "/requests/completed",
        label: "Completed",
        content: <TabContent />,
      },
    ],
    [],
  );

  const handleSelect = useCallback(
    (k: Key) => {
      router.push(`/dashboard/${k}`);
      console.log(k);
      setSelected(k as string);
    },
    [router, setSelected],
  );
  return (
    <main className="relative px-4 py-1">
      <div className="h-[calc(90vh)]">
        <Tabs
          items={tabs}
          onSelectionChange={handleSelect}
          defaultSelectedKey={"all"}
          selectedKey={selected}
          size="md"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "",
            panel: "bg-pink-300 py-0",
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} title={tab.label}>
              {tab.content}
            </Tab>
          ))}
        </Tabs>
        {children}
      </div>
      <div className="absolute -top-10 right-4 z-50 flex items-center space-x-4">
        <Button
          size="md"
          radius="sm"
          variant="solid"
          className="w-fit bg-primary-800 text-primary-50"
          onPress={handleCreateNewRequest}
        >
          <PlusIcon className="size-4" />
          <p className="font-inter text-xs font-medium tracking-tight text-primary-100">
            Create New Request
          </p>
        </Button>
        <Button
          size="md"
          radius="sm"
          variant="flat"
          color="default"
          className="group w-fit"
        >
          <p className="font-inter text-xs font-medium tracking-tighter">
            Support
          </p>
          <CircleHelpIcon className="size-4 stroke-[1.5px]" />
        </Button>
      </div>
    </main>
  );
};

const TabContent = () => <div />;
