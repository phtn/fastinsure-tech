"use client";

import { Tab, Tabs } from "@nextui-org/react";
import {
  type Key,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUtils } from "@/utils/useUtils";
import { cn } from "@/lib/utils";
import { ButtSex } from "@/ui/button/index";
import { guid } from "@/utils/helpers";
import type { TabItem } from "@/app/types";

export const TabContainer = ({ children }: PropsWithChildren) => {
  const pathname = usePathname().split("/")[3];
  const [selected, setSelected] = useState<string>(pathname!);
  const router = useRouter();

  // const { create } = useRequest();

  const tabs: TabItem[] = useMemo(
    () => [
      {
        id: 0,
        value: "/team",
        label: "All",
        content: <TabContent />,
      },
      {
        id: 1,
        value: "/team/agents",
        label: "Agents",
        content: <TabContent />,
      },
      // {
      //   id: 4,
      //   value: "/requests/completed",
      //   label: "Completed",
      //   content: <TabContent />,
      // },
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

  const handleCreate = useCallback(() => {
    router.push(`/dashboard/request/create?rid=${guid()}`);
  }, [router]);

  const midbarRef = useRef<HTMLDivElement>(null);
  const { centerpoint } = useUtils(midbarRef);

  return (
    <div className="relative pt-1">
      <div className="flex w-full border-t-[0.33px] border-dotted border-primary-200/50" />
      <section className="flex px-4">
        <Tabs
          items={tabs}
          onSelectionChange={handleSelect}
          defaultSelectedKey={"all"}
          selectedKey={selected}
          size="sm"
          variant="bordered"
          color="secondary"
          className="absolute -top-[3.2rem] right-4 z-[200] border-primary-300"
          isVertical={false}
          classNames={{
            tabList:
              "w-full border border-primary-300 dark:border-primary-500/40",
            tab: "w-fit font-semibold tracking-tight text-xs",
          }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} title={tab.label}>
              {tab.content}
            </Tab>
          ))}
        </Tabs>
      </section>

      <div className="-mt-2 h-[calc(93vh)] px-12">{children}</div>
      <div
        ref={midbarRef}
        style={{ left: centerpoint.x, width: 500 }}
        className={cn(
          "absolute -top-[3.5rem] z-50",
          "flex items-center justify-center",
          "transfor-gpu transition-all duration-500 ease-out",
          "space-x-2",
        )}
      >
        <ButtSex size="sm" inverted start={"calendar-outline"} onClick={handleCreate}>
          <p className="font-inter text-xs font-medium tracking-tight">
            View Calendar
          </p>
        </ButtSex>
        <ButtSex size="sm" start={"group"} onClick={handleCreate}>
          <p className="font-inter text-xs font-medium tracking-tight">
            Create Teams
          </p>
        </ButtSex>
        {/* <section className="flex h-[32px] items-center mx-1.5 rounded-[8px] border-[0.33px] border-macd-gray bg-goddess dark:border-primary-500/40 dark:bg-void">
          <ButtSqx size="sm" variant="god" disabled icon={ListBulletIcon} />
          <ButtSqx size="sm" variant="active" icon={Squares2X2Icon} />
        </section> */}
      </div>
    </div>
  );
};

const TabContent = () => <div />;
