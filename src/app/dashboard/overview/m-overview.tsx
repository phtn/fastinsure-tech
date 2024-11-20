"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { CreateAgentCode } from "./comp/actions";
import { Splash } from "./comp/splash";
import type { OverviewProps } from "./types";
// import { useRequest } from "../hooks/useRequest";
// import { Action } from "@/ui/action-card";
// import { CatIcon } from "lucide-react";

export const ManagerOverview = ({ user }: OverviewProps) => {
  // const create = useRequest();

  return (
    <div className="overflow-auto pb-6">
      <Splash />
      <div className="mx-2 h-4 backdrop-blur-xl" />
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <Widget.Title>Hello, {user?.email}</Widget.Title>
                <CreateAgentCode />
                {/* <CreateRequest {...create} /> */}
                {/* <SpecialAction
                  title="Git Fucked"
                  subtext="we ball"
                  icon={CatIcon}
                >
                  <Action>
                    <Action.Btn
                      onPress={() => console.log("fuck!")}
                      loading={false}
                    >
                      <Action.Label>GET</Action.Label>
                    </Action.Btn>
                  </Action>
                </SpecialAction> */}
              </div>
            </HStack.XsCol>
            <HStack.XsCol>
              <div className="h-full w-full text-background"></div>
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
