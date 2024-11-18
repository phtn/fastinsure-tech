"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { VBar } from "./charts/vbar";
import { CreateRequest } from "./comp/actions";
import { Splash } from "./comp/splash";
import { useRequest } from "../hooks/useRequest";

export const AgentOverview = () => {
  const create = useRequest();
  return (
    <div className="_z-50 overflow-auto pb-6">
      <Splash />
      <div className="mx-2 h-4 backdrop-blur-xl" />
      <Widget>
        <Widget.Diffused>
          <Widget.Header>
            <Widget.Title>Overview</Widget.Title>
            <Widget.Subtext className="text-foreground">
              See how everything is going
            </Widget.Subtext>
          </Widget.Header>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <CreateRequest {...create} />
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
        </Widget.Diffused>
        <Widget.PadLg />
      </Widget>
    </div>
  );
};

export const Glances = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
      <div className="flex items-center justify-center"></div>
      <div className="flex items-center justify-center">{/* <HBar /> */}</div>
      <div className="flex items-center justify-center">{/* <FBar /> */}</div>
    </div>
  );
};
