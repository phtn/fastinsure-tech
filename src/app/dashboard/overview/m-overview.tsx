"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { CreateAgentCode, CreateRequest } from "./comp/actions";
import { Splash } from "./comp/splash";
import { motion } from "framer-motion";
import { HyperText } from "@/ui/hypertext";
import { Button } from "@nextui-org/react";
import { useAuthCtx } from "@/app/ctx/auth";
import { useCallback, useEffect, useState } from "react";
import { useVex } from "@/app/ctx/convex";
import type { SelectUser } from "@convex/users/d";
import { Err } from "@/utils/helpers";
import { BigActionCard } from "@/ui/action-card";
import { FireIcon } from "@heroicons/react/24/solid";
import { useRequest } from "../hooks/useRequest";
import { Flag } from "./comp/status-flag";
// import { Action } from "@/ui/action-card";
// import { CatIcon } from "lucide-react";

export const ManagerOverview = () => {
  const { verifyCurrentUser, registered, user } = useAuthCtx();
  const { usr } = useVex();
  const [vxUser, setVxUser] = useState<SelectUser | null>(null);
  const create = useRequest();

  const getVx = useCallback(async () => {
    if (!user) return;
    const vx = await usr.get.byId(user.uid);
    setVxUser(vx);
  }, [user, usr.get]);

  useEffect(() => {
    getVx().catch(Err);
  }, [getVx]);

  const getVResult = useCallback(async () => {
    if (vxUser?.group_code === "NEO") {
      const vresult = await verifyCurrentUser(user);
      if (vresult?.group_code !== "NEO") {
        if (!user) return;
        await usr.update({
          uid: user.uid,
          group_code: vresult?.group_code,
          is_verified: true,
        });
      }
    }
  }, [user, verifyCurrentUser, usr, vxUser?.group_code]);

  useEffect(() => {
    getVResult().catch(Err);
  }, [user, getVResult, vxUser?.group_code]);

  return (
    <div className="overflow-auto pb-6">
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
              metric={registered}
              label={["account", "registered", "unauthorized"]}
            />
            <Flag
              metric={vxUser?.group_code !== "NEO"}
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
                <Widget.Title>Hello, {user?.email}</Widget.Title>
                <CreateAgentCode />
                <CreateRequest {...create} />
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

export const NextStep = ({}) => (
  <div className="flex w-[calc(50vw)] items-center justify-between space-x-4 px-4 pt-5">
    <div className="flex h-10 w-80 items-center overflow-x-hidden rounded-md bg-void/5 px-4 font-inst text-[10px] font-thin tracking-wide backdrop-blur-xl">
      <p className="w-fit whitespace-nowrap"> _id: </p>
    </div>
    <div className="flex h-12 w-fit items-center space-x-8 whitespace-nowrap pl-28">
      <p className="font-thin opacity-40">&middot;</p>
      <p className="font-jet text-xs font-light uppercase tracking-wider">
        Next step:
      </p>
      <Button variant="solid" color="primary" size="md" radius="sm">
        Activate your account
      </Button>
    </div>
  </div>
);

// const Stats = () => {
//   const arrfour = [1, 2, 3, 4];
//   return (
//     <div className="mb-4 flex w-full gap-4">
//       {arrfour.map((i) => (
//         <Stat key={i}>
//           <Stat.Header title="Users" tag="users" />
//           <Stat.Icon icon={UsersIcon} />
//           <Stat.Content>
//             <Stat.Content.Value>10</Stat.Content.Value>
//             <Stat.Content.Key>x</Stat.Content.Key>
//           </Stat.Content>
//         </Stat>
//       ))}
//     </div>
//   );
// };
