"use client";

import { ButtSqx } from "@/ui/button/index";
import { Separator } from "@/ui/separator";
import {
  ChatBubbleLeftRightIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import {
  BoltIcon,
  CursorArrowRaysIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/solid";
import { Link, User } from "@nextui-org/react";
import { FileSymlink } from "lucide-react";
import { useTeam } from "./useTeam";
import { Loader } from "@/ui/loader";
import { type SelectUser } from "@convex/users/d";

export const All = () => {
  const { vxteam, pending } = useTeam();

  if (pending) return <Loader />;

  return (
    <div className="grid w-full grid-cols-1 gap-6 px-6 md:grid-cols-3">
      <div className="h-fit space-y-3 rounded-[2rem] bg-primary-100/60 px-6 py-3">
        <div className="flex h-10 items-center space-x-2 text-sm font-bold tracking-tight">
          <div className="rounded-full bg-void/80 p-1">
            <BoltIcon className="size-3 text-warning" />
          </div>
          <p>Most active</p>
        </div>
        <div className="space-y-6">
          {vxteam?.map((member) => (
            <Member key={member.account_id} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Member = ({ nickname, email }: SelectUser) => (
  <div className="h-28 rounded-3xl bg-primary-50 drop-shadow-sm">
    <div className="flex h-1/2 items-center justify-between px-2">
      <User
        name={nickname}
        description={
          <Link
            href="https://twitter.com/jrgarciadev"
            size="sm"
            isExternal
            className="text-xs text-secondary"
          >
            {email}
          </Link>
        }
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
        }}
        classNames={{
          name: "font-semibold capitalize tracking-tight",
        }}
      />
      <ButtSqx icon={EllipsisHorizontalIcon} />
    </div>
    <div className="flex justify-center">
      <Separator
        orientation="horizontal"
        className="h-px bg-primary-50/5 opacity-40"
      />
    </div>
    <div className="flex h-1/2 w-full items-center justify-start space-x-4 px-6">
      <ButtSqx icon={ChatBubbleLeftRightIcon} />
      <ButtSqx icon={DevicePhoneMobileIcon} />
      <ButtSqx icon={FileSymlink} />
      <ButtSqx icon={CursorArrowRaysIcon} />
    </div>
  </div>
);
