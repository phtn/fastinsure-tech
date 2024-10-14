"use client";

import { HStack } from "@/ui/hstack";
import { Screen } from "@/ui/screen";
import { StatPanel, StatPanelContent } from "@/ui/stats";
import { Widget } from "@/ui/widget";
import { UsersIcon } from "@heroicons/react/24/solid";
import { VBar } from "./overview/charts/vbar";
import { CreateAgentCode } from "./overview/comp/actions";

export const Overview = () => {
  const arrtwo = [6, 9];
  const arrfour = [1, 2, 3, 4];
  return (
    <>
      <div className="mb-4 flex w-full gap-4">
        {arrfour.map((i) => (
          <StatPanel key={i} title="Users" tag="users" icon={UsersIcon}>
            <StatPanelContent statValue={10} statKey="x" />
          </StatPanel>
        ))}
      </div>

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
              <div className="h-full w-full text-background">
                <VBar requests={[]} />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background">
                <VBar requests={[]} />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-foreground">
                <CreateAgentCode />
              </div>
            </HStack.XsCol>
          </HStack>
        </Widget.Diffused>
        <Widget.PadLg />
      </Widget>
    </>
  );
};

const Glances = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-3 md:gap-4">
      <div className="flex items-center justify-center"></div>
      <div className="flex items-center justify-center">{/* <HBar /> */}</div>
      <div className="flex items-center justify-center">{/* <FBar /> */}</div>
    </div>
  );
};
