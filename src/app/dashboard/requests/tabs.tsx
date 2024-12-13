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
  // content: ReactElement | MemoExoticComponent<() => ReactElement>;
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
        label: "All",
        content: <TabContent />,
      },
      {
        id: 1,
        value: "/requests/submitted",
        label: "Submitted",
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
      <section className="flex px-4">
        <div className="flex w-full"></div>
        <Tabs
          items={tabs}
          onSelectionChange={handleSelect}
          defaultSelectedKey={"all"}
          selectedKey={selected}
          size="md"
          variant="underlined"
          className="absolute -top-[3.25rem] right-0 z-[200] border-b-[0.5px] border-primary-300"
          isVertical={false}
          classNames={{
            tabList: "w-full px-3 dark:-mb-1.5 -mb-[5px]",
            tab: "w-32 font-semibold tracking-tight text-sm",
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              title={tab.label}
              className={cn({ "text-warning": tab.value === selected })}
            >
              {tab.content}
            </Tab>
          ))}
        </Tabs>
      </section>

      <div className="-mt-2 h-[calc(90vh)] px-12">{children}</div>
      <div
        ref={midbarRef}
        style={{ left: centerpoint.x, width: 300 }}
        className={cn(
          "absolute -top-[3.25rem] z-50",
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

        <section className="flex rounded-xl border-[0.33px] border-primary-100/60">
          <ButtSqx size="md" variant="god" icon={ListBulletIcon} />
          <ButtSqx size="md" variant="goddess" icon={Squares2X2Icon} />
        </section>
      </div>
    </div>
  );
};

const TabContent = () => <div />;
