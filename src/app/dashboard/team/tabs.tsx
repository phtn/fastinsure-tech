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
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUtils } from "@/utils/useUtils";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/index";

export interface TabItem {
  id: string | number;
  value: Key;
  label: string;
  content: ReactElement;
  // content: ReactElement | MemoExoticComponent<() => ReactElement>;
}

export const TabContainer = ({ children }: PropsWithChildren) => {
  const pathname = usePathname().split("/")[3];
  const [selected, setSelected] = useState<string>(pathname!);
  const router = useRouter();

  // const handleCreateNewRequest = useCallback(() => {
  // const request_id = guid
  // router.push(`/dashboard/request/create?rid=${request_id}`);
  // }, [router])

  const tabs: TabItem[] = useMemo(
    () => [
      {
        id: 0,
        value: "/team",
        label: "All",
        content: <TabContent />,
      },
      {
        id: 3,
        value: "/team/agents",
        label: "Agents",
        content: <TabContent />,
      },
      {
        id: 4,
        value: "/team/underwriter",
        label: "Underwriters",
        content: <TabContent />,
      },
    ],
    [],
  );

  const handleSelect = useCallback(
    (k: Key) => {
      router.push(`/dashboard/${k}`);
      setSelected(k as string);
    },
    [router, setSelected],
  );

  const midbarRef = useRef<HTMLDivElement>(null);
  const { centerpoint } = useUtils(midbarRef);

  return (
    <div className="relative px-4 pt-1">
      <section className="flex">
        <div className="flex w-full"></div>
        <Tabs
          items={tabs}
          onSelectionChange={handleSelect}
          defaultSelectedKey={"all"}
          selectedKey={selected}
          size="md"
          color="primary"
          variant="underlined"
          className="absolute -top-10 right-0 z-[200] border-b-[0.5px] border-primary-300"
          isVertical={false}
          classNames={{
            tabList: "w-full px-3 -mb-1",
            tab: "w-32",
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} title={tab.label}>
              {tab.content}
            </Tab>
          ))}
        </Tabs>
      </section>

      <div className="h-[calc(90vh)]">{children}</div>
      <div
        ref={midbarRef}
        style={{ left: centerpoint.x, width: 300 }}
        className={cn(
          "absolute -top-10 z-50",
          "flex items-center justify-center",
          "transfor-gpu transition-all duration-300 ease-out",
          "space-x-4",
        )}
      >
        <Button
          size="md"
          radius="sm"
          variant="flat"
          className="w-fit"
          onPress={() => null}
        >
          <PlusIcon className="size-4" />
          <p className="font-inter text-xs font-medium tracking-tight">
            Create
          </p>
        </Button>
        <ButtSqx
          size="md"
          variant="flat"
          color="default"
          className="group w-fit"
          icon={CircleHelpIcon}
        />
      </div>
    </div>
  );
};

const TabContent = () => <div />;
