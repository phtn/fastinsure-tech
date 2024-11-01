"use client";

import { Separator } from "@/ui/separator";
import { Dock, DockIcon } from "@/ui/dock";
import { type HTMLAttributes, useEffect, useMemo, type ReactNode } from "react";
import { useTooltip } from "../ctx/tooltip";
import { Tooltip } from "@/ui/tooltip";

import { ThemeSwitch, useThemeCtx } from "../ctx/theme";
import { Badge, Image } from "@nextui-org/react";
import { ServerStackIcon, UserIcon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useServer } from "@/lib/hooks/useServer";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover";
import { type UID } from "../types";
import { type MotionProps } from "framer-motion";
import type { ServerStatus } from "@/lib/secure/handlers";
import { cn } from "@/lib/utils";

export type IconProps = HTMLAttributes<SVGElement> & {
  liveness?: ServerStatus;
};

const ServerIcon = (props: IconProps) => {
  return (
    <Badge
      size="sm"
      color={props.liveness?.data !== "OK" ? "warning" : "success"}
      content=""
      placement="bottom-right"
      shape="circle"
      className="text-teal-500"
      showOutline={false}
      isDot
    >
      <ServerStackIcon className="size-5 text-background" {...props} />
    </Badge>
  );
};

const DATA = {
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "#", icon: UserIcon, label: "Profile" },
  ],
  quicklinks: {
    alerts: {
      Chat: {
        name: "Chat",
        url: "#",
        icon: ChatBubbleBottomCenterIcon,
      },
      Notifications: {
        name: "Notifications",
        url: "#",
        icon: BellIcon,
      },
    },
  },
  system: {
    server: {
      name: "Server Status",
      url: "#",
      icon: ServerIcon,
    },
  },
};

export function ActionBar() {
  const { liveness, checkServerStatus } = useServer();

  useEffect(() => {
    checkServerStatus().catch(console.error);
  }, [checkServerStatus]);
  const { hoveredIndex, motionProps } = useTooltip();
  const props = { hoveredIndex, motionProps };
  return (
    <div className="fixed bottom-6 right-6 z-[300] flex h-fit w-fit flex-col items-center justify-center text-background">
      <Dock direction="middle">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.label}>
            <item.icon className="size-4" />
          </DockIcon>
        ))}
        <Separator
          orientation="vertical"
          className="h-1/3 bg-primary-400/60 py-2"
        />
        {Object.entries(DATA.quicklinks.alerts).map(([name, item]) => (
          <DockIcon key={name}>
            <Tooltip>
              <item.icon className="size-4 fill-foreground/50" />
              <Tooltip.Animated id={name} {...props}>
                <Tooltip.Label>
                  <p>{name}</p>
                </Tooltip.Label>
              </Tooltip.Animated>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator
          orientation="vertical"
          className="h-1/3 bg-primary-400/60 py-2"
        />

        <DockIcon>
          <ServerHealth liveness={liveness}>
            <ServerButton {...props} liveness={liveness!} />
          </ServerHealth>
        </DockIcon>
        <DockIcon>
          <Tooltip>
            <ThemeSwitch />
            <Tooltip.Animated id={8} {...props}>
              <Tooltip.Label>
                <p>Theme</p>
              </Tooltip.Label>
            </Tooltip.Animated>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}

interface ActionButton {
  hoveredIndex: UID;
  motionProps: MotionProps;
  liveness: ServerStatus | undefined;
}

function ServerButton(props: ActionButton) {
  const { server } = DATA.system;
  return (
    <Tooltip>
      <server.icon className="size-5" liveness={props.liveness} />
      <Tooltip.Animated {...props} id={server.name}>
        <Tooltip.Label>
          <p>{server.name}</p>
        </Tooltip.Label>
      </Tooltip.Animated>
    </Tooltip>
  );
}

interface ServerHealthData {
  id: string;
  logo: string;
  title: string;
  status: string;
  remarks?: string;
}
interface ServerHealthProps {
  children: ReactNode;
  liveness: ServerStatus | null;
}
function ServerHealth({ children, liveness }: ServerHealthProps) {
  const { theme } = useThemeCtx();
  const light = theme === "light";
  const server_up = useMemo(() => liveness?.data === "OK", [liveness?.data]);
  const server_health_data: ServerHealthData[] = useMemo(
    () => [
      {
        id: "re-up",
        logo: light ? "/svg/re-up.svg" : "/svg/re-up_light.svg",
        title: "re-up-secure SV",
        status: server_up ? "OK" : "DOWN",
      },
      {
        id: "rbds",
        logo: light ? "/svg/redis.svg" : "/svg/redis_light.svg",
        title: "rdbs1-remote DB",
        status: server_up ? "OK" : "DOWN",
      },
      {
        id: "psql",
        logo: light ? "/svg/postgres.svg" : "/svg/postgres_light.svg",
        title: "psql1-remote DB",
        status: server_up ? "OK" : "DOWN",
      },
    ],
    [light, server_up],
  );

  return (
    <HoverCard closeDelay={0}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="mb-4 mr-6 w-80 overflow-clip rounded-xl p-0"
      >
        {server_health_data.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 bg-background px-3 py-2 backdrop-blur-xl"
          >
            <div className="flex h-7 items-center justify-center">
              <Image
                alt={item.title}
                src={item.logo}
                className="size-fit rounded-sm fill-foreground"
                width={20}
                height={20}
              />
            </div>
            <div className="flex h-7 w-full items-center justify-between space-x-4">
              <p className="font-jet text-xs text-foreground/60">
                {item.title} -{" "}
                <strong
                  className={cn("text-foreground/90", {
                    "text-rose-200/80": !server_up,
                  })}
                >
                  {item.status}
                </strong>
              </p>
              <p
                className={cn("tracking-wider text-success-300", {
                  "text-foreground/40": !server_up,
                  "animate-pulse text-amber-600":
                    item.id === "re-up" && !server_up,
                })}
              >
                {"ꔷ".repeat(!server_up ? (item.id === "re-up" ? 3 : 2) : 5)}
              </p>
            </div>
          </div>
        ))}
      </HoverCardContent>
    </HoverCard>
  );
}
