"use client";

import type { ClassName } from "@/app/types";
import { Icon } from "@/lib/icon";
import { type IconName } from "@/lib/icon/types";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/index";
import { HyperList } from "@/ui/list";
import { LoaderMd } from "@/ui/loader";
import { Separator } from "@/ui/separator";
import { Err, opts } from "@/utils/helpers";
import { type SelectUser } from "@convex/users/d";
import { Link, User } from "@nextui-org/react";
import {
    type FC,
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import { UserConfig } from "./components";
import { useTeam } from "./useTeam";

export const All = () => {
  const { vxmembers, userLogs, getUserLogs, pending } = useTeam();
  const [open2, setOpen2] = useState(false);
  const [selected, setSelected] = useState("");
  const toggleUserConfig = useCallback(
    () => setOpen2((prev) => !prev),
    [setOpen2],
  );

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
            <ButtSqx
              id={props.uid}
              onClick={createUserWindow(props.uid)}
              icon={"more-horizontal"}
            />
          </div>
          <div className="flex justify-center">
            <Separator
              orientation="horizontal"
              className="h-px bg-primary-50/5 opacity-40"
            />
          </div>
          <div className="flex h-1/2 w-full items-center justify-start space-x-4 px-6">
            <ButtSqx variant="goddess" icon={"chat-outline"} />
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
      <div className="grid w-full grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
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
  icon: IconName;
  iconColor?: ClassName;
}

const ListTitle = (props: ListTitleProps) => (
  <div className="flex h-10 items-center space-x-2 text-sm font-bold capitalize tracking-tight">
    <div className="rounded-full bg-void/80 p-1">
      <Icon name={props.icon} className={cn("size-4", props.iconColor)} />
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
      <ListTitle title="most active" icon="energy-fill" iconColor="text-warning" />
      <HyperList
        data={data}
        component={comp}
        container="space-y-3 pb-8"
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
