"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { VBar } from "./overview/charts/vbar";
import { CreateAgentCode, GetUserInfo } from "./overview/comp/actions";
import { Splash } from "./overview/comp/splash";

export const NeoOverview = () => {
  return (
    <div className="overflow-auto pb-6">
      <Splash />
      <div className="mx-2 h-4 backdrop-blur-xl" />
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <Widget.Title>Welcome Neophyte</Widget.Title>
                <CreateAgentCode />
                <GetUserInfo />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background">
                <VBar requests={[]} />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background">
                <VBar requests={[]} />
              </div>
            </HStack.XsCol>
          </HStack>
        </Widget.BaseII>
        <Widget.PadLg />
      </Widget>
    </div>
  );
};
