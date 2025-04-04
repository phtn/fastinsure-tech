"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { Splash } from "./comp/splash";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { Greeting } from "./comp/greeting";
import { motion } from "framer-motion";
import { Flag } from "./comp/status-flag";
import { CreateRequest } from "./comp/actions";
import { VBar } from "./charts/vbar";
import { Recents } from "./comp/recents";

export const AgentOverview = () => {
  const { user, vxuser } = useAuthCtx();
  const UserOptions = useCallback(() => {
    const options = opts(
      <Greeting name={user?.displayName} email={user?.email} />,
      null,
    );
    return <>{options.get(!!user)}</>;
  }, [user]);

  return (
    <div className="overflow-auto scroll-smooth rounded-tl-3xl p-4">
      <Splash text={"Dashboard"} role={vxuser?.role}>
        <div className="absolute top-4 z-[60] flex h-1/2 w-1/3 items-center space-x-2 border-primary px-12 font-inst text-2xl delay-1000">
          <UserOptions />
        </div>
        <div className="absolute bottom-0 z-[60] h-1/2 w-full px-12">
          <motion.section
            initial={{ height: "0%" }}
            animate={{ height: "66%" }}
            transition={{ duration: 2, delay: 3 }}
            className="flex h-2/3 w-full flex-col items-start justify-start space-y-[2px] border-l-[0.33px] border-primary/40"
          >
            <Flag
              metric={vxuser?.group_code !== ""}
              label={["account", vxuser?.group_code, "NOT REGISTERED"]}
            />
            <Flag
              metric={!!vxuser && vxuser?.group_code !== "NEO"}
              label={["status", "active", "inactive"]}
            />
          </motion.section>
        </div>
      </Splash>
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <Widget.Title>Functions</Widget.Title>
                <CreateRequest />
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="relative mt-10 h-96 w-full overflow-hidden">
                <div className="absolute flex h-full w-full overflow-hidden rounded-md border border-primary backdrop-blur-xl dark:border-army/40">
                  <VBar requests={[]} />
                </div>
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="relative mt-10 h-96 w-full overflow-hidden">
                <div className="absolute flex h-full w-full overflow-hidden rounded-md border border-primary backdrop-blur-xl dark:border-army/40">
                  <Recents />
                </div>
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background"></div>
            </HStack.XsCol>
          </HStack>
        </Widget.BaseII>
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
