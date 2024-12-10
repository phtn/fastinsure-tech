"use client";

import { useAuthCtx } from "@/app/ctx/auth";
import { HStack } from "@/ui/hstack";
import { HyperText } from "@/ui/hypertext";
import { Widget } from "@/ui/widget";
import { motion } from "framer-motion";
import { CreateAgentCode, CreateRequest } from "./comp/actions";
import { Splash } from "./comp/splash";

import { Window } from "@/ui/window";
import {
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useRequest } from "../hooks/useRequest";
import { Flag } from "./comp/status-flag";

export const ManagerOverview = () => {
  const { user, vxuser } = useAuthCtx();
  const create = useRequest();

  return (
    <div className="overflow-auto rounded-tl-3xl p-4">
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
              metric={!!vxuser}
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
                <Widget.Title>
                  Hello,{" "}
                  {vxuser?.nickname !== "" ? vxuser?.nickname : vxuser?.email}
                </Widget.Title>
                <CreateAgentCode />
                <CreateRequest {...create} />
              </div>
            </HStack.XsCol>
            <HStack.SmCol>
              <div className="flex w-full justify-between space-x-4">
                <Window
                  title="Activity"
                  icon={ArrowTrendingUpIcon}
                  variant="god"
                >
                  <div className="flex h-96 w-full bg-chalk dark:bg-slate-300/80"></div>
                </Window>
                {/* <Window title="Notifications" variant="god">
                  <div className="flex h-96 w-full bg-chalk dark:bg-slate-300/80"></div>
                </Window> */}
                <Window
                  title="Messages"
                  icon={ChatBubbleLeftRightIcon}
                  variant="god"
                >
                  <div className="flex h-96 w-full bg-chalk dark:bg-slate-300/80"></div>
                </Window>
              </div>

              {/* <BigActionCard>
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
              </BigActionCard> */}
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

// const ActivityGrid = (props: { data: BentoCardProps[] }) => {
//   return (
//     <div className="h-full w-full">
//       <div className="h-full w-full">
//         <BentoGrid className="h-full w-full rounded-xl backdrop-blur-xl">
//           {props.data.map((activity) => (
//             <BentoCardDash
//               key={activity.title}
//               {...activity}
//               className="col-span-3 h-fit w-full whitespace-nowrap"
//             />
//           ))}
//         </BentoGrid>
//       </div>
//     </div>
//   );
// };

// const activity_data: BentoCardProps[] = [
//   {
//     icon: DocumentIcon,
//     title: "Request Status",
//     description: "",
//     href: "/",
//     cta: "Learn more",
//     className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
//   },
//   {
//     icon: BellIcon,
//     title: "Notifications",
//     description: "",
//     href: "/",
//     cta: "Learn more",
//     className: "lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-1",
//   },
//   {
//     icon: ChatBubbleLeftRightIcon,
//     title: "Messages",
//     description: "",
//     href: "/",
//     cta: "Learn more",
//     className: "lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-1",
//   },
// ];
