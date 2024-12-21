"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
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
    <div className="overflow-auto p-4 pb-6">
      <Splash text={"Account Activation"}>
        <FlexRow className="relative -top-3 z-[300] h-full w-2/3 items-start space-x-7 p-4">
          <UserCardOptions />
        </FlexRow>
      </Splash>
      {/* <div className="mx-2 h-4 backdrop-blur-xl" /> */}
      <Widget>
        <Widget.BaseII>
          <HStack.LgCol>
            <ActivationComponent>
              <CodeEntry activateFn={activateFn} />
            </ActivationComponent>
          </HStack.LgCol>
        </Widget.BaseII>
        <Widget.PadLg />
      </Widget>
    </div>
  );
};
