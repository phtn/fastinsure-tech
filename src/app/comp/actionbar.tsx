"use client";

import { Separator } from "@/ui/separator";
import { Dock, DockIcon } from "@/ui/dock";
import {
  type HTMLAttributes,
  useEffect,
  useMemo,
  type ReactNode,
  useState,
} from "react";

import { ThemeSwitch, useThemeCtx } from "../ctx/theme";
import { Badge, Image, Link } from "@nextui-org/react";
import { CircleStackIcon, SlashIcon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  CheckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useServer } from "@/lib/hooks/useServer";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover";
import type { ServerStatus } from "@/lib/secure/handlers";
import { cn } from "@/lib/utils";
import type { DualIcon } from "../types";

export type IconProps = HTMLAttributes<SVGElement> & {
  liveness?: ServerStatus;
};

const ServerIcon = (props: IconProps) => {
  return (
    <Badge
      size="sm"
      color={props.liveness?.data !== "OK" ? "warning" : "success"}
      content={
        <CheckIcon className="size-2.5 shrink-0 stroke-[1.5px] text-foreground" />
      }
      placement="bottom-right"
      shape="circle"
      className="size-3 text-teal-500"
      showOutline={false}
      isDot
    >
      <CircleStackIcon className="size-5 text-background" {...props} />
    </Badge>
  );
};

const DATA = {
  navbar: [
    { href: "/", icon: SlashIcon, label: "Home" },
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
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    // Define the reconnect function

    // Attempt to reconnect immediately if not connected
    if (!liveness) {
      checkServerStatus().catch(console.error);
    }

    // Set up the interval
    const intervalId = setInterval(() => {
      if (!liveness) {
        checkServerStatus().catch(console.error);
        setElapsed((prev) => prev + 1);
      }
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [liveness, checkServerStatus]);

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex h-fit w-fit flex-col items-center justify-center text-background">
      <Dock direction="middle">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.label}>
            <Icon href={item.href} icon={item.icon} />
          </DockIcon>
        ))}
        <Separator
          orientation="vertical"
          className="h-1/3 bg-primary-400/60 py-2"
        />
        {Object.entries(DATA.quicklinks.alerts).map(([name, item]) => (
          <DockIcon key={name}>
            <Icon href={item.url} icon={item.icon} />
          </DockIcon>
        ))}
        <Separator
          orientation="vertical"
          className="h-1/3 bg-primary-400/60 py-2"
        />

        <DockIcon>
          <ServerHealth liveness={liveness}>
            {!liveness ? (
              <p className="font-jet text-[13px] font-medium">
                {elapsed}
                <span className="text-[10px] font-thin">s</span>
              </p>
            ) : (
              <ServerButton liveness={liveness} />
            )}
          </ServerHealth>
        </DockIcon>
        <DockIcon>
          <ThemeSwitch />
        </DockIcon>
      </Dock>
    </div>
  );
}

interface DockIcon {
  href: string;
  icon: DualIcon;
}
const Icon = (props: DockIcon) => (
  <Link
    href={props.href}
    className="group flex size-6 items-center justify-center rounded-lg text-background transition-colors duration-300 ease-out hover:bg-foreground dark:hover:bg-background"
  >
    <props.icon className="size-4 fill-background stroke-2 group-hover:dark:fill-foreground" />
  </Link>
);

interface ActionButton {
  liveness: ServerStatus | undefined;
}

function ServerButton(props: ActionButton) {
  const { server } = DATA.system;
  return <server.icon className="size-5" liveness={props.liveness} />;
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
