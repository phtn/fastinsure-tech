"use client";

import { Splash } from "./comp/splash";

import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useCallback, useMemo } from "react";
import { ActivationComponent } from "./comp/updates";
import { FlexRow } from "@/ui/flex";
import { UserCard } from "./comp/user-card";
import { opts } from "@/utils/helpers";
import { CodeEntry } from "./comp/code-entry";

export const NeoOverview = () => {
  const { vxuser, activateFn } = useAuthCtx();

  const vx = useMemo(() => !!vxuser, [vxuser]);

  const UserCardOptions = useCallback(() => {
    const options = opts(<UserCard vxuser={vxuser} />, null);
    return <>{options.get(vx)}</>;
  }, [vxuser, vx]);

  return (
    <div className="p-4 pb-6">
        <Splash text={"Account Activation"}>
          <FlexRow className="relative -top-3 z-[300] h-full w-2/3 items-start space-x-7 p-4">
            <UserCardOptions />
          </FlexRow>
        </Splash>
        <div className="mt-8 grid grid-cols-2 gap-6">
          <ActivationComponent/>
          <div className="flex h-96 p-6 w-full items-start justify-start font-inst text-xs">
            <CodeEntry activateFn={activateFn} />
          </div>
        </div>
      </div>
  );
};
