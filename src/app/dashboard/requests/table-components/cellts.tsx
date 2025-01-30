import { ButtSqx } from "@/ui/button/button";
import { FlexRow } from "@/ui/flex";
import {
  ArrowDownOnSquareIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";
import { cn, User } from "@nextui-org/react";
import { Link, PencilIcon } from "lucide-react";
import moment from "moment";
import { useCallback, useMemo } from "react";
import { useRequests } from "../useRequests";

export const RequestIdCell = (props: { id: string }) => {
  const route = `/dashboard/request/viewer?rid=${props.id}`;
  // const route = `/dashboard`;

  const handleRoute = useCallback(() => {
    console.log(route);
  }, [route]);

  return (
    <Link
      href={route}
      className="flex w-28 items-start justify-center rotate-180"
    >
      <ButtSqx onClick={handleRoute} size="lg" icon={ArrowDownOnSquareIcon} />
    </Link>
  );
};

export const DateCell = (props: {
  date: number | undefined;
  create?: boolean;
}) => {
  return (
    <div className="h-fit w-44">
      <div
        className={cn(
          "h-5 text-sm font-medium tracking-tight dark:text-indigo-200",
          { "dark:text-vanilla": props.create },
        )}
      >
        {moment(props?.date).format("lll")}
      </div>
      <div className="h-5 space-x-1 text-sm tracking-tight opacity-80 dark:text-steel">
        <span>{moment(props?.date).format("ddd")}</span>
        <span>{moment(props?.date).fromNow()}</span>
      </div>
    </div>
  );
};

export const AssuredCell = (props: { id: string | undefined }) => {
  const data = useRequests().vxsubjects;
  // const data = useQuery(api.subjects.get.all);
  //
  const subject = useMemo(
    () => data?.find((s) => s.subject_id === props.id),
    [props.id, data],
  );

  return (
    <div className="h-10 w-48">
      <div
        className={cn("text-xs font-medium tracking-tight dark:text-indigo-50")}
      >
        {data?.length}-{subject?.fullname ?? props.id}
      </div>
      <div className="space-x-1 text-[11px] dark:text-steel">
        <span>{subject?.email ?? subject?.phone_number}</span>
      </div>
    </div>
  );
};

export const PolicyTypeCell = (props: { type: string | undefined }) => {
  const policyType = () => {
    switch (props.type) {
      case "auto":
        return (
          <div className="flex h-6 items-center rounded-md bg-gradient-to-tr from-army/30 via-cake/10 to-transparent px-1">
            <span className="font-inst text-sm font-medium capitalize tracking-tight dark:text-chalk">
              auto
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-6 items-center rounded-md bg-gradient-to-tr from-army/30 via-cake/10 to-transparent px-1">
            <span className="text-xs font-medium capitalize tracking-tight dark:text-chalk">
              auto
            </span>
          </div>
        );
    }
  };
  return (
    <FlexRow className="h-full w-32 items-center justify-center">
      {policyType()}
    </FlexRow>
  );
};

export const PolicyCoverageCell = (props: { type: string | undefined }) => {
  const coverage = () => {
    switch (props.type) {
      case "comprehensive":
        return (
          <div className="flex h-6 items-center rounded-md bg-gradient-to-tr from-army/30 via-cake/10 to-transparent px-1">
            <span className="text-sm uppercase tracking-tight dark:text-chalk">
              full
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-6 items-center rounded-md bg-gradient-to-tr from-army/30 via-cake/10 to-transparent px-1">
            <span className="text-sm capitalize tracking-tight dark:text-chalk">
              CTPL
            </span>
          </div>
        );
    }
  };
  return (
    <FlexRow className="w-32 items-center justify-center">{coverage()}</FlexRow>
  );
};

export const ServiceTypeCell = (props: { type: string | undefined }) => {
  const serviceType = () => {
    switch (props.type) {
      case "new":
        return (
          <div className="flex h-6 items-center rounded-md bg-gradient-to-tr from-orange-300/50 via-orange-200/10 to-transparent px-1 dark:from-slate-800/20">
            <span className="text-sm font-medium capitalize tracking-tight text-orange-950 dark:text-chalk">
              new
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-6 items-center rounded-md bg-gradient-to-tr from-teal-300/50 via-teal-200/10 to-transparent px-1 dark:from-slate-800/20">
            <span className="text-sm font-medium capitalize text-teal-950 dark:text-chalk">
              Renew
            </span>
          </div>
        );
    }
  };
  return (
    <FlexRow className="h-6 w-32 items-center justify-center">
      {serviceType()}
    </FlexRow>
  );
};

export const StatusCell = (props: { status: string | undefined }) => {
  const status = () => {
    switch (props.status) {
      case "submitted":
        return (
          <div className="flex h-6 items-center rounded-md bg-gradient-to-tr from-blue-300/50 via-blue-200/10 to-transparent ps-1 dark:bg-steel/15 dark:from-slate-800/20 dark:text-chalk">
            <span className="text-sm font-medium capitalize text-blue-950 dark:text-chalk">
              submitted
            </span>
            <ArrowLongUpIcon className="size-4 stroke-2 text-secondary dark:text-secondary" />
          </div>
        );
      default:
        return (
          <div className="flex h-6 items-center gap-4 rounded-lg border border-primary-300 bg-steel/10 px-2 dark:text-chalk">
            <span className="text-xs font-medium capitalize tracking-tight">
              draft
            </span>
            <PencilIcon className="size-3.5 stroke-1 text-primary-600/80 -rotate-[35deg]" />
          </div>
        );
    }
  };
  return (
    <div className="flex w-40 items-center justify-center">{status()}</div>
  );
};

export const UserCell = (props: { id: string; agent?: boolean }) => {
  const { underwriters, vxusers, role } = useRequests();
  const vx = props.agent
    ? vxusers?.find((u) => u.uid === props.id)
    : role === "underwriter"
      ? vxusers?.find((u) => u.role === "supervisor")
      : underwriters?.find((u) => u.uid === props.id);
  return props.id !== "" ? (
    <User
      id={vx?.uid}
      name={vx?.nickname?.split(" ")[0]}
      description={
        <div className="flex items-center font-mono text-xs tracking-tight text-adam drop-shadow-sm hover:opacity-100 hover:drop-shadow-md dark:text-chalk">
          {/* {vx?.email} */}
          {/* <ChatBubbleBottomCenterTextIcon className="size-4" /> */}
        </div>
      }
      avatarProps={{
        src: vx?.photo_url,
        size: "sm",
        className: "size-4",
      }}
      classNames={{
        name: " font-medium text-primary/90 font-inter capitalize tracking-tight",
        wrapper: "w-[9rem] truncate",
      }}
    />
  ) : (
    <span className="flex h-[36px] items-center rounded-xl border border-primary-300/60 bg-steel/10 px-3 font-jet text-sm">
      Not set
    </span>
  );
};
