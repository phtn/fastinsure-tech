"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { Splash } from "./comp/splash";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { HyperText } from "@/ui/hypertext";
import { motion } from "framer-motion";
import { Flag } from "./comp/status-flag";
import { GenericAction } from "./comp/actions";
import { BigActionCard } from "@/ui/action-card";

export const LoggedOutView = () => {
  const { user, signOut } = useAuthCtx();

  return (
    <div className="_z-50 overflow-auto pb-6">
      <Splash text={""}>
        <div className="absolute top-4 z-[60] flex h-1/2 w-1/3 items-center space-x-2 border-primary px-12 font-inst text-2xl delay-1000">
          {user ? (
            <span className="flex w-full whitespace-nowrap">
              <span>Hello,</span>{" "}
              <span className="font-medium lowercase">
                <HyperText text={user.displayName ?? user.email!} />
              </span>
            </span>
          ) : null}
        </div>
        <div className="absolute bottom-0 z-[60] h-1/2 w-full px-12">
          <motion.section
            initial={{ height: "0%" }}
            animate={{ height: "66%" }}
            transition={{ duration: 2, delay: 3 }}
            className="flex h-2/3 w-full flex-col items-start justify-start space-y-[2px] border-l-[0.33px] border-primary/40"
          >
            <Flag
              metric={false}
              label={["account", "registered", "unauthorized"]}
            />
            <Flag metric={false} label={["status", "active", "inactive"]} />
          </motion.section>
        </div>
      </Splash>
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <Widget.Title>Hello, {user?.email}</Widget.Title>
                <GenericAction
                  loading={false}
                  fn={signOut}
                  icon="sparkle"
                  title={"Verify Account"}
                  subtext=""
                  label="verify"
                />
              </div>
            </HStack.XsCol>
            <HStack.SmCol>
              <BigActionCard>
                <BigActionCard.IconComponent icon={"energy-fill"} />
                <div>
                  <BigActionCard.Header>
                    <BigActionCard.Title>Updates</BigActionCard.Title>
                    <BigActionCard.Subtext>
                      Read blog posts from our team.
                    </BigActionCard.Subtext>
                  </BigActionCard.Header>
                  <div className="flex h-72 w-96 items-start justify-start pr-4 pt-4 font-inst text-xs">
                    <div className="size-full rounded-lg bg-chalk drop-shadow dark:bg-chalk/60"></div>
                  </div>
                </div>
                <div className="h-full w-full rounded-lg bg-void"></div>
              </BigActionCard>
            </HStack.SmCol>
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
