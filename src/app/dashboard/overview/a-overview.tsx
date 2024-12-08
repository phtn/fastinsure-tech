"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { Splash } from "./comp/splash";
import { GenericAction } from "./comp/actions";
import { ServerCrashIcon } from "lucide-react";
import { getLivez } from "@/lib/secure/callers/server";
import { useAuthCtx } from "@/app/ctx/auth";

export const AgentOverview = () => {
  const { vxuser } = useAuthCtx();
  return (
    <div className="_z-50 overflow-auto pb-6">
      <Splash />
      <div className="mx-2 h-4 backdrop-blur-xl" />
      <Widget>
        <Widget.Diffused>
          {/* <Widget.Header>
            <Widget.Title>Agent verview</Widget.Title>
            <Widget.Subtext className="text-foreground">
              See how everything is going
            </Widget.Subtext>
          </Widget.Header> */}
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <Widget.Title>Hello, {vxuser?.email}</Widget.Title>
                <GenericAction
                  loading={false}
                  fn={getLivez}
                  icon={ServerCrashIcon}
                  title={"Verify Account"}
                  subtext=""
                  label="verify"
                />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background"></div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background"></div>
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
