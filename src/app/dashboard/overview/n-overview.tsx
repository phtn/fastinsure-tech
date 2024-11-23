"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { Splash } from "./comp/splash";
import { motion } from "framer-motion";
import { HyperText } from "@/ui/hypertext";
import { SpecialAction } from "./comp/actions";
import {
  BookOpenIcon,
  ShieldCheckIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { BigActionCard } from "@/ui/action-card";
import { FireIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@nextui-org/react";
import { useAuthCtx } from "@/app/ctx/auth";
import { useCallback } from "react";
import { activateAccount } from "@/app/actions";

export const NeoOverview = () => {
  const { user } = useAuthCtx();
  // const handleVerification = useCallback(async () => {
  //   const vresult = await verifyCurrentUser(user);
  //   console.log(vresult);
  // }, [verifyCurrentUser, user]);

  const handleActivation = useCallback(async (data: FormData) => {
    await activateAccount(data);
  }, []);

  return (
    <div className="overflow-auto pb-6">
      <Splash text={""}>
        <div className="absolute top-4 z-[60] flex h-1/2 w-1/3 items-center border-primary px-12 font-inst text-2xl delay-1000">
          {user ? `Hello, ${user?.displayName}!` : null}
        </div>
        <div className="absolute bottom-0 z-[60] h-1/2 w-full px-12">
          <motion.section
            initial={{ height: "0%" }}
            animate={{ height: "66%" }}
            transition={{ duration: 2, delay: 3 }}
            className="flex h-2/3 w-full items-start justify-start border-l-[0.33px] border-primary/40"
          >
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 4, opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 }}
              className="h-5 border-y-[0.33px] border-e-[0.33px] border-primary/60 bg-warning"
            >
              <div className="flex h-5 items-center px-3.5 font-jet text-xs font-light tracking-wider">
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 5 }}
                  className="uppercase"
                >
                  Status
                </motion.p>
                <motion.div
                  initial={{ visibility: "hidden" }}
                  animate={{ visibility: "inherit" }}
                  transition={{ delay: 5.5 }}
                  className="w-fit font-bold"
                >
                  <HyperText duration={1500} text="inactive" />
                </motion.div>
              </div>
              <div className="flex w-[calc(50vw)] items-center justify-between space-x-4 px-4 pt-5">
                <form action={handleActivation}>
                  <div className="flex h-12 w-fit items-center space-x-1.5 whitespace-nowrap">
                    <Input
                      size="sm"
                      radius="sm"
                      name="hcode"
                      placeholder="code"
                      className="h-[2.175rem] w-32 rounded-md border border-primary-500 bg-primary-50 font-bold tracking-[0.25rem] text-foreground/80"
                      classNames={{
                        input: "text-center uppercase",
                      }}
                    />
                    <Button
                      size="sm"
                      radius="sm"
                      variant="solid"
                      color="primary"
                      className="h-[2.175rem] w-32 px-2 font-inter font-medium"
                      type="submit"
                    >
                      Activate now
                    </Button>
                    <Input
                      size="sm"
                      name="email"
                      className="hidden"
                      defaultValue={user?.email ?? ""}
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </Splash>
      {/* <div className="mx-2 h-4 backdrop-blur-xl" /> */}
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-[0px] text-foreground">
                <Widget.Title>
                  <p className="decoration-slice px-4 py-6 font-bold tracking-wide underline decoration-primary-400 decoration-2 underline-offset-[6px]">
                    Start here
                  </p>
                </Widget.Title>
                <SpecialAction
                  loading={false}
                  label="Read"
                  href="#"
                  subtext="Basic use and features."
                  title="Introduction"
                  icon={WindowIcon}
                />
                <SpecialAction
                  loading={false}
                  label="Read"
                  href="#"
                  subtext="Need help?"
                  title="Documentation"
                  icon={BookOpenIcon}
                />
                <SpecialAction
                  loading={false}
                  label="Read"
                  href="#"
                  subtext="Learn how we use your data."
                  title="Privacy Policy"
                  icon={ShieldCheckIcon}
                />
              </div>
            </HStack.XsCol>
            <HStack.SmCol>
              <BigActionCard>
                <BigActionCard.Icon icon={FireIcon} />
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
          </HStack>
        </Widget.BaseII>
        <Widget.PadLg />
      </Widget>
    </div>
  );
};
