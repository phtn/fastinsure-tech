"use client";

import { Separator } from "@/ui/separator";
import { Dock, DockIcon } from "@/ui/dock";
import { useEffect, useState, useCallback } from "react";

import { ThemeSwitch } from "../ctx/theme";
import { Link } from "@nextui-org/react";
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useServer } from "@/lib/hooks/useServer";

import type { DualIcon } from "../types";
import { getLivez } from "@/lib/secure/callers/server";
import { type LivezResponse } from "@/lib/secure/resource";
import { opts } from "@/utils/helpers";
import { DevCommands } from "@/debug/fn";
import { ServerHealth, ServerIcon } from "./actionbar/server-status";

const DATA = {
  navbar: [
    // { href: "/", icon: SlashIcon, label: "Home" },
    { href: "/dashboard/account", icon: UserIcon, label: "Profile" },
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
  const { livez, checkServerStatus } = useServer();
  const [elapsed, setElapsed] = useState(0);
  const [open, setOpen] = useState(false);

  const DevCMD = useCallback(
    () => <DevCommands open={open} setOpen={setOpen} />,
    [open, setOpen],
  );

  useEffect(() => {
    if (!livez) {
      checkServerStatus().catch(console.error);
    }

    const intervalId = setInterval(() => {
      if (!livez) {
        getLivez().catch(console.error);
        setElapsed((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [livez, checkServerStatus]);

  const ServerHealthChild = useCallback(() => {
    const options = opts(
      <ServerButton livez={livez} />,
      <p className="font-jet text-[13px] font-medium">
        {elapsed}
        <span className="text-[10px] font-thin">s</span>
      </p>,
    );
    return <>{options.get(!!livez)}</>;
  }, [livez, elapsed]);

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex h-fit w-fit flex-col items-center justify-center dark:bg-background">
      <Dock direction="middle">
        {DATA.navbar.map((item) => (
          <DockIcon key={item.label}>
            <Icon href={item.href} icon={item.icon} />
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-1/3 py-2" />
        {Object.entries(DATA.quicklinks.alerts).map(([name, item]) => (
          <DockIcon key={name}>
            <Icon href={item.url} icon={item.icon} />
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-1/3 py-2" />
        <DockIcon>
          <ThemeSwitch />
        </DockIcon>
        <DockIcon>
          <ServerHealth livez={livez}>
            <ServerHealthChild />
          </ServerHealth>
        </DockIcon>
      </Dock>
      <DevCMD />
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
    className="group flex size-8 items-center justify-center rounded-lg text-icon-dark transition-colors duration-300 ease-out hover:bg-primary/10 dark:text-icon-dark"
  >
    <props.icon className="size-5" />
  </Link>
);

interface ActionButton {
  livez: LivezResponse | null;
}

function ServerButton(props: ActionButton) {
  const { server } = DATA.system;
  return <server.icon className="size-5" livez={props?.livez} />;
}
