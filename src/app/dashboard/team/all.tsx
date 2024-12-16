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
import { LoaderMd } from "@/ui/loader";
import { type SelectUser } from "@convex/users/d";
import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Err, opts, toggleState } from "@/utils/helpers";
import { HyperList } from "@/ui/list";
import { UserConfig } from "./components";

export const All = () => {
  const { vxmembers, userLogs, getUserLogs, pending } = useTeam();
  const [open2, setOpen2] = useState(false);
  const [selected, setSelected] = useState("");
  const toggleUserConfig = useCallback(() => toggleState(setOpen2), [setOpen2]);

  const vx = useMemo(
    () => vxmembers?.find((v) => v.uid === selected),
    [selected, vxmembers],
  );

  useEffect(() => {
    if (selected) getUserLogs(selected).catch(Err);
  }, [selected, getUserLogs]);

  const createUserWindow = useCallback(
    (uid: string | undefined) => () => {
      if (uid) {
        setSelected(uid);
        toggleUserConfig();
      }
    },
    [toggleUserConfig, setSelected],
  );

  const TeamMember = useCallback(
    (props: Partial<SelectUser>) => {
      return (
        <div className="h-28 w-full rounded-2xl bg-primary-50 drop-shadow-sm">
          <div className="flex h-1/2 items-center justify-between px-3">
            <UserCard {...props} />
            {/* <TooltipNode
              title="User Settings"
              description="butt-fuck"
              id={props.uid!}
            > */}
            <ButtSqx
              id={props.uid}
              onClick={createUserWindow(props.uid)}
              icon={EllipsisHorizontalIcon}
            />
            {/* </TooltipNode> */}
          </div>
          <div className="flex justify-center">
            <Separator
              orientation="horizontal"
              className="h-px bg-primary-50/5 opacity-40"
            />
          </div>
          <div className="flex h-1/2 w-full items-center justify-start space-x-4 px-6">
            <ButtSqx variant="goddess" icon={ChatBubbleLeftRightIcon} />
            <ButtSqx variant="goddess" icon={DevicePhoneMobileIcon} />
            <ButtSqx variant="goddess" icon={FileSymlink} />
            <ButtSqx variant="goddess" icon={CursorArrowRaysIcon} />
          </div>
        </div>
      );
    },
    [createUserWindow],
  );

  const MostActiveList = useCallback(() => {
    const options = opts(
      <LoaderMd />,
      <ListContent comp={TeamMember} data={vxmembers} />,
    );
    return <>{options.get(pending)}</>;
  }, [pending, vxmembers, TeamMember]);

  return (
    <div className="w-full">
      <div className="grid w-full grid-cols-1 gap-6 px-6 md:grid-cols-3">
        <ListContainer pending={pending}>
          <MostActiveList />
        </ListContainer>
      </div>
      <section className="relative z-[200] size-full">
        <UserConfig
          vx={vx}
          open={open2}
          title={selected}
          toggleFn={toggleUserConfig}
          logs={userLogs}
        />
      </section>
    </div>
  );
};

interface ListTitleProps {
  title: string;
  icon: DualIcon;
  iconColor?: ClassName;
}

const ListTitle = (props: ListTitleProps) => (
  <div className="flex h-10 items-center space-x-2 text-sm font-bold capitalize tracking-tight">
    <div className="rounded-full bg-void/80 p-1">
      <props.icon className={cn("size-3", props.iconColor)} />
    </div>
    <p>{props.title}</p>
  </div>
);

const UserCard = ({ nickname, uid, email, photo_url }: Partial<SelectUser>) => (
  <User
    id={uid}
    name={nickname}
    description={
      <Link
        href="#"
        size="sm"
        isExternal
        className="text-xs text-blue-500 drop-shadow-sm hover:text-blue-500 hover:opacity-100 hover:drop-shadow-md dark:text-secondary"
      >
        {email}
      </Link>
    }
    avatarProps={{
      src: photo_url,
      size: "sm",
    }}
    classNames={{
      name: "ml-1 font-semibold text-primary/80 capitalize tracking-tight",
      wrapper: "space-x-1",
    }}
  />
);

interface ListContentProps<T> {
  data: T[] | undefined;
  comp: FC<T>;
}
const ListContent = <T extends SelectUser>({
  comp,
  data,
}: ListContentProps<T>) => {
  return (
    <section className="space-y-3">
      <ListTitle title="most active" icon={BoltIcon} iconColor="text-warning" />
      <HyperList
        data={data}
        component={comp}
        container="space-y-3"
        itemStyle="rounded-2xl"
        keyId={"uid"}
      />
    </section>
  );
};

interface ListContainerProps {
  pending: boolean;
  children: ReactNode;
}
const ListContainer = ({ children, pending }: ListContainerProps) => {
  return (
    <div
      className={cn(
        "h-fit rounded-3xl bg-primary-100/60 px-3 pt-2 transition-transform duration-500 ease-out transform-gpu",
        {
          "h-96 p-0": pending,
        },
      )}
    >
      {children}
    </div>
  );
};
