"use client";

import { Tab, Tabs } from "@nextui-org/react";
import {
  ListBulletIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
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
import { ButtSex, ButtSqx } from "@/ui/button/index";
import { guid } from "@/utils/helpers";

export interface TabItem {
  id: string | number;
  value: Key;
  label: string;
  content: ReactElement;
}

export const TabContainer = ({ children }: PropsWithChildren) => {
  const pathname = usePathname().split("/")[3];
  const [selected, setSelected] = useState<string>(pathname!);
  const router = useRouter();

  // const { create } = useRequest();

  const tabs: TabItem[] = useMemo(
    () => [
      {
        id: 0,
        value: "/requests",
        label: "Refresh",
        content: <TabContent />,
      },
      // {
      //   id: 1,
      //   value: "/requests/submitted",
      //   label: "Submitted",
      //   content: <TabContent />,
      // },
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
    <div className="relative">
      <section className="flex items-center px-4">
        <Tabs
          items={tabs}
          onSelectionChange={handleSelect}
          defaultSelectedKey={"all"}
          selectedKey={selected}
          size="sm"
          className="absolute -top-[3.2rem] right-4 z-[200]"
          isVertical={false}
          classNames={{
            tabList:
              "w-full",
            tab: "w-fit font-semibold tracking-tight text-xs",
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              title={tab.label}
              className={cn({ "text-gray-500": tab.value === selected })}
            >
              {tab.content}
            </Tab>
          ))}
        </Tabs>
      </section>

      <div className="-mx-4 -mt-6 h-[calc(93vh)] px-12">{children}</div>
      <div
        ref={midbarRef}
        style={{ left: centerpoint.x, width: 300 }}
        className={cn(
          "absolute -top-[3.5rem] z-50",
          "flex items-center justify-center",
          "transfor-gpu transition-all duration-500 ease-out",
          "space-x-4",
        )}
      >
        <ButtSex size="sm" start={PlusIcon} onClick={handleCreate}>
          <p className="font-inter text-xs font-medium tracking-tight">
            Create New Request
          </p>
        </ButtSex>

        <section className="flex h-[32px] items-center rounded-[8px] border border-primary-300 bg-goddess px-0.5 dark:border-primary-500/40 dark:bg-void">
          <ButtSqx size="sm" variant="active" icon={ListBulletIcon} />
          <ButtSqx size="sm" variant="goddess" icon={Squares2X2Icon} />
        </section>
      </div>
    </div>
  );
};

const TabContent = () => <div />;
