"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { VBar } from "./charts/vbar";
import { CreateAgentCode } from "./comp/actions";
import { Splash } from "./comp/splash";
// import { useRequest } from "../hooks/useRequest";

export const UOverview = () => {
  // const create = useRequest();
  return (
    <div className="overflow-auto pb-6">
      <div className="flex w-full justify-center">
        <Splash />
      </div>
      <section className="-mt-4 flex h-12 w-full px-6">
        <div className="via-cool/5 flex h-10 w-full items-center justify-end bg-gradient-to-b from-cake/10 to-transparent backdrop-blur-xl">
          <div className="to-cool/5 flex h-full w-44 bg-gradient-to-r from-background via-background/60"></div>
          <div className="flex h-full w-full" />
          <div className="bg-macd-adam w-fit whitespace-nowrap px-2 font-jet text-xs">
            All systems good.
          </div>
          <div className="to-cool/10 flex h-full w-8 bg-gradient-to-l from-background via-background/60"></div>
        </div>
      </section>
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <CreateAgentCode />
                {/* <CreateRequest {...create} /> */}
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background">
                <VBar requests={[]} />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="relative size-96 overflow-hidden bg-teal-400">
                <div className="absolute size-full bg-void/20 backdrop-blur-xl"></div>
                <div className="size-full bg-pink-100"></div>
              </div>
            </HStack.XsCol>
          </HStack>
        </Widget.BaseII>
        <Widget.PadLg />
      </Widget>
    </div>
  );
};
