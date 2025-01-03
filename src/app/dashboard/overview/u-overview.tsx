"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { VBar } from "./charts/vbar";
import { GenericAction } from "./comp/actions";
import { Splash } from "./comp/splash";
import {
  DocumentChartBarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Tab, Tabs } from "@nextui-org/react";

export const UOverview = () => {
  return (
    <div className="overflow-auto pb-6">
      <div className="flex w-full justify-center">
        <Splash />
      </div>
      <section className="-mt-4 flex h-12 w-full px-6">
        <div className="via-cool/5 flex h-10 w-full items-center justify-end bg-gradient-to-b from-cake/10 to-transparent backdrop-blur-xl">
          <div className="to-cool/5 flex h-full w-44 bg-gradient-to-r from-background via-background/60"></div>
          <div className="flex h-full w-full" />
          <div className="bg-macd-adam w-fit whitespace-nowrap px-2 font-jet text-xs"></div>
          <div className="to-cool/10 flex h-full w-8 bg-gradient-to-l from-background via-background/60"></div>
        </div>
      </section>
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <GenerateReport />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="relative h-96 w-full overflow-hidden">
                <div className="absolute flex h-full w-full overflow-hidden rounded-md border border-primary backdrop-blur-xl dark:border-army/40">
                  <VBar requests={[]} />
                </div>
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="relative h-96 w-full overflow-hidden">
                <div className="absolute flex h-full w-full overflow-hidden rounded-md border border-primary backdrop-blur-xl dark:border-army/40">
                  <Recents />
                </div>
              </div>
            </HStack.XsCol>
          </HStack>
        </Widget.BaseII>
        <Widget.PadLg />
      </Widget>
    </div>
  );
};

const GenerateReport = () => {
  return (
    <GenericAction
      title="Generate Reports"
      subtext=""
      icon={DocumentChartBarIcon}
      fn={() => console.log()}
      label="create"
      loading={false}
    />
  );
};

const Recents = () => (
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
          <div className="flex w-full flex-col border-[0.33px] border-primary-300 bg-stone-200/40 p-6">
            <div className="flex w-full items-center justify-center space-x-2 text-sm">
              <InformationCircleIcon className="size-4 shrink-0 stroke-2 text-gray-500" />
              <span className="font-medium">No record.</span>
            </div>
            <p className="text-center text-sm opacity-80">
              You have not viewed any accounts.
            </p>
          </div>
        </div>
      </Tab>
      <Tab key={"completed"} title="Completed">
        <div className="mt-8 size-full bg-void"></div>
      </Tab>
    </Tabs>
  </div>
);
