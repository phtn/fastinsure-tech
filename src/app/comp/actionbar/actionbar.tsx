"use client";

import { Separator } from "@/ui/separator";
import { Dock, DockIcon } from "@/ui/dock";
import { useEffect, useState, useCallback } from "react";
import { ThemeSwitch } from "@ctx/theme";
import { useServer } from "@/lib/hooks/useServer";

import { getLivez } from "@/trpc/secure/callers/server";
import { Err, opts } from "@/utils/helpers";
import { DevCommands } from "@/debug/fn";
import { ServerHealth } from "./server-status";
import { useRouter } from "next/navigation";
import { type IconName } from "@/lib/icon/types";
import { Icon } from "@/lib/icon";

const DATA = {
  navbar: [{ href: "/dashboard/account", icon: "user-circle", label: "Profile" }],
  quicklinks: {
    alerts: {
      Chat: {
        name: "Chat",
        url: "#",
        icon: "chat-outline",
      },
      Notifications: {
        name: "Notifications",
        url: "#",
        icon: "bell",
      },
    },
  },
  system: {
    server: {
      name: "Server Status",
      url: "#",
      icon: "server",
    },
  },
};

export function ActionBar() {
  const { livez, checkServerStatus } = useServer();
  const [elapsed, setElapsed] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const DevCMD = useCallback(
    () => <DevCommands open={open} setOpen={setOpen} />,
    [open, setOpen],
  );

  useEffect(() => {
    if (!livez) {
      checkServerStatus().catch(Err);
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
      <ServerButton icon="settings-01" />,
      <p className="font-jet text-[13px] font-medium text-icon">
        {elapsed}
        <span className="text-[10px] font-thin">s</span>
      </p>,
    );
    return <>{options.get(!!livez)}</>;
  }, [livez, elapsed]);

  const prefetchRoute = useCallback(
    (route: string) => () => {
      router.prefetch(route);
    },
    [router],
  );

  const handleIconClick = useCallback(
    (route: string) => () => {
      router.push(route);
    },
    [router],
  );

  return (
    <div className="fixed bottom-8 right-8 z-[300] flex h-fit w-fit flex-col items-center justify-center rounded-lg dark:bg-background">
      <Dock direction="middle">
        {DATA.navbar.map((item) => (
          <DockIcon
            key={item.label}
            prefetch={prefetchRoute(item.href)}
            onClick={handleIconClick(item.href)}
          >
            <Icon name="arrow-left-01" href={item.href} />
          </DockIcon>
        ))}
        <Separator
          orientation="vertical"
          className="group/dock-hover:flex hidden h-1/3 py-2"
        />
        {Object.entries(DATA.quicklinks.alerts).map(([name, item]) => (
          <DockIcon key={name}>
            <Icon href={item.url} name="arrow-right-02" />
          </DockIcon>
        ))}
        <Separator
          orientation="vertical"
          className="group/dock-hover:flex hidden h-1/3 py-2"
        />
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
  icon: IconName;
}

interface ActionButton {
  icon: IconName;
}

function ServerButton(props: ActionButton) {
  return <Icon name={props.icon} className="size-5" />;
}
