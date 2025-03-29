"use client";

import { Splash } from "./comp/splash";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { TimelineComponent } from "@/components/timeline";
import { BigActionCard } from "@/ui/action-card";
import { FlexRow } from "@/ui/flex";
import { opts } from "@/utils/helpers";
import { useCallback, useMemo } from "react";
import { CodeEntry } from "./comp/code-entry";
import { UserCard } from "./comp/user-card";

export const NeoOverview = () => {
  const { vxuser, activateFn } = useAuthCtx();

  const vx = useMemo(() => !!vxuser, [vxuser]);

  const UserCardOptions = useCallback(() => {
    const options = opts(<UserCard vxuser={vxuser} />, null);
    return <>{options.get(vx)}</>;
  }, [vxuser, vx]);

  return (
    <div className="p-4 pb-6 h-screen overflow-y-scroll">
        <Splash sm text={"Dashboard"} role={vxuser?.role}>
          <FlexRow className="relative -top-3 z-[300] h-full w-2/3 items-start space-x-7 p-4">
            <UserCardOptions />
          </FlexRow>
        </Splash>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 h-fit">
          <BigActionCard>
            <div className="h-full md:px-4 px-1 w-full space-y-8">
              <div className="font-inst text-3xl tracking-tighter font-extrabold text-white dark:text-chalk/80">
                Activation Guide
              </div>
              <TimelineComponent />
            </div>
          </BigActionCard>
          <div className="flex h-[38rem] md:h-96 md:p-6 w-full md:items-start items-center justify-center md:pb-4 pb-40 md:justify-start font-inst text-xs">
            <CodeEntry activateFn={activateFn} />
          </div>
        </div>
      </div>
  );
};
