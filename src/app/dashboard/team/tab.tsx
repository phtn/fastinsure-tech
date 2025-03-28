"use client";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/index";
import { useUtils } from "@/utils/useUtils";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import {
    type Key,
    type PropsWithChildren,
    type ReactElement,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";

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

  const tabs: TabItem[] = useMemo(
    () => [
      {
        id: 0,
        value: "/team",
        label: "All",
        content: <TabContent />,
      },
      // {
      //   id: 3,
      //   value: "/team/agents",
      //   label: "Agents",
      //   content: <TabContent />,
      // },
      // {
      //   id: 4,
      //   value: "/team/underwriter",
      //   label: "Underwriters",
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
          <Icon name="plus-sign" className="size-4" />
          <p className="font-inter text-xs font-medium tracking-tight">
            Create
          </p>
        </Button>
        <ButtSqx
          size="md"
          variant="god"
          className="group w-fit"
          icon={"information-circle"}
        />
      </div>
    </div>
  );
};

const TabContent = () => <div />;
