"use client";

import { HStack } from "@/ui/hstack";
import { Stat } from "@/ui/stats";
import { Widget } from "@/ui/widget";
import { UsersIcon } from "@heroicons/react/24/solid";
import { VBar } from "./overview/charts/vbar";
import { CreateAgentCode, GetUserInfo } from "./overview/comp/actions";

export const ManagerOverview = () => {
  const arrfour = [1, 2, 3, 4];
  return (
    <div className="overflow-auto pb-20">
      <div className="mb-4 flex w-full gap-4">
        {arrfour.map((i) => (
          <Stat key={i}>
            <Stat.Header title="Users" tag="users" />
            <Stat.Icon icon={UsersIcon} />
            <Stat.Content>
              <Stat.Content.Value>10</Stat.Content.Value>
              <Stat.Content.Key>x</Stat.Content.Key>
            </Stat.Content>
          </Stat>
        ))}
      </div>

      <Widget>
        <Widget.Diffused>
          <Widget.Header>
            <Widget.Title>Manager Overview</Widget.Title>
            <Widget.Subtext className="text-foreground">
              See how everything is going
            </Widget.Subtext>
          </Widget.Header>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
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