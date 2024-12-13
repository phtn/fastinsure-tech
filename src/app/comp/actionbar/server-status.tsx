import type { LivezResponse } from "@/server/secure/resource";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/ui/hover";
import { HyperList } from "@/ui/list";
import { CheckIcon } from "@heroicons/react/24/outline";
import { CircleStackIcon } from "@heroicons/react/24/solid";
import { Badge, Image } from "@nextui-org/react";
import { type HTMLAttributes, type ReactNode, useMemo } from "react";

interface ServerHealthData {
  id: string;
  logo: string;
  title: string;
  status: string;
  remarks?: string;
}
interface ServerHealthProps {
  children: ReactNode;
  livez: LivezResponse | null;
}
export type IconProps = HTMLAttributes<SVGElement> & {
  livez: LivezResponse | null;
};

export const ServerIcon = (props: IconProps) => {
  return (
    <Badge
      size="sm"
      color={props?.livez?.Status !== 200 ? "warning" : "success"}
      content={
        <CheckIcon className="size-3 shrink-0 stroke-[4px] text-chalk shadow-void drop-shadow-md" />
      }
      placement="bottom-right"
      shape="circle"
      className="size-3 text-success"
      showOutline={false}
      isDot
    >
      <CircleStackIcon
        className={cn("size-5 text-chalk dark:text-icon-dark")}
      />
    </Badge>
  );
};
export function ServerHealth({ children, livez }: ServerHealthProps) {
  const server_up = useMemo(() => livez?.Status === 200, [livez]);
  const server_health_data: ServerHealthData[] = useMemo(
    () => [
      {
        id: "re-up",
        logo: "/svg/re-up.svg",
        title: "re-up-secure SV",
        status: server_up ? "OK" : "DOWN",
      },
      {
        id: "rbds",
        logo: "/svg/redis.svg",
        title: "rdbs1-remote DB",
        status: server_up ? "READY" : "DOWN",
      },
      {
        id: "psql",
        logo: "/svg/postgres.svg",
        title: "psql1-remote DB",
        status: server_up ? "READY" : "DOWN",
      },
    ],
    [server_up],
  );

  return (
    <HoverCard closeDelay={0}>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="mb-4 mr-8 w-80 max-w-[] overflow-clip rounded-xl p-0"
      >
        <HyperList
          data={server_health_data}
          component={ServerListItem}
          container="bg-chalk"
        />
      </HoverCardContent>
    </HoverCard>
  );
}

const ServerListItem = (props: ServerHealthData) => (
  <div
    key={props.id}
    className="flex items-center space-x-4 bg-chalk px-3 py-2 backdrop-blur-xl"
  >
    <div className="flex h-7 items-center justify-center">
      <Image
        alt={props.title}
        src={props.logo}
        className="size-fit rounded-sm fill-foreground"
        width={20}
        height={20}
      />
    </div>
    <div className="flex h-7 w-full items-center justify-between space-x-4">
      <p className="font-jet text-xs text-void">
        <span>{props.title} - </span>
        <strong
          className={cn("text-void", {
            "text-rose-500/80": props.status === "DOWN",
          })}
        >
          {props.status}
        </strong>
      </p>
      <p
        className={cn("tracking-widest text-success", {
          "text-foreground/40": props.status === "DOWN",
          "animate-pulse text-amber-600":
            props.id === "re-up" && props.status === "DOWN",
        })}
      >
        {"●".repeat(
          props.status === "DOWN" ? (props.id === "re-up" ? 3 : 2) : 4,
        )}
      </p>
    </div>
  </div>
);
