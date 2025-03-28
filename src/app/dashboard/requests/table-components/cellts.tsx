import { ButtSqx } from "@/ui/button/button";
import { FlexRow } from "@/ui/flex";
import { cn, User } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { useRequests } from "../useRequests";
import { getInitials } from "@/utils/helpers";

// Common styles
const cellStyles = {
  base: "flex h-6 border-[0.33px] border-primary-400 items-center rounded-md px-1.5",
  gradientBase: "bg-gradient-to-tr",
  text: "text-sm font-medium capitalize tracking-tight dark:text-chalk",
};

export const RequestIdCell = memo((props: { id: string }) => {
  const router = useRouter();
  const route = useMemo(() => `/dashboard/request/viewer?rid=${props.id}`, [props.id]);

  const handleRoute = useCallback(() => {
    router.push(route);
  }, [router, route]);

  return (
    <div className="flex w-28 items-center justify-center">
      <ButtSqx

      variant="god"
        onClick={handleRoute}
        iconStyle="group-hover/btn:text-secondary text-primary stroke-1"
        icon={"document-outline"}
        size="md"
      />
    </div>
  );
});
RequestIdCell.displayName = "RequestIdCell";

export const DateCell = memo((props: {
  date: number | undefined;
  create?: boolean;
}) => {
  const formattedDate = useMemo(() => moment(props?.date), [props?.date]);

  return (
    <div className="h-fit w-52">
      <div
        className={cn(
          "h-5 text-xs font-semibold tracking-tight dark:text-indigo-200",
          { "dark:text-vanilla": props.create },
        )}
      >
        {formattedDate.format("lll")}
      </div>
      <div className="h-5 space-x-2.5 text-xs tracking-tight opacity-80 dark:text-steel">
        <span>{formattedDate.format("ddd")}</span>
        <span className="opacity-30">⏺</span>
        <span>{formattedDate.fromNow()}</span>
      </div>
    </div>
  );
});
DateCell.displayName = "DateCell";

export const AssuredCell = memo((props: { name: string | undefined, email: string | undefined }) => {
  return (
    <div className="h-10 w-40 space-y-1">
      <div className="text-xs uppercase font-semibold tracking-tight dark:text-indigo-50">
        {props.name}
      </div>
      <div className="space-x-1 text-[11px] dark:text-steel">
        <span>{props.email}</span>
      </div>
    </div>
  );
});
AssuredCell.displayName = "AssuredCell";

const PolicyTypeWrapper = memo(({ children }: { children: React.ReactNode }) => (
  <FlexRow className="h-full w-32 items-center justify-center">
    {children}
  </FlexRow>
));
PolicyTypeWrapper.displayName = "PolicyTypeWrapper";

export const PolicyTypeCell = memo((props: { type: string | undefined }) => {
  const content = useMemo(() => {
    const type = props.type ?? "auto";
    return (
      <div className={cn(
        cellStyles.base,
        cellStyles.gradientBase,
        "from-army/30 via-cake/10 to-transparent"
      )}>
        <span className={cellStyles.text}>{type}</span>
      </div>
    );
  }, [props.type]);

  return <PolicyTypeWrapper>{content}</PolicyTypeWrapper>;
});
PolicyTypeCell.displayName = "PolicyTypeCell";

export const PolicyCoverageCell = memo((props: { type: string | undefined }) => {
  const content = useMemo(() => {
    switch (props.type) {
      case "comprehensive":
        return (
          <div className={cn(
            cellStyles.base,
            cellStyles.gradientBase,
            "from-vanilla via-ice to-cake"
          )}>
            <span className={cn(cellStyles.text, "uppercase")}>full</span>
          </div>
        );
      default:
        return (
          <div className={cn(
            cellStyles.base,
            cellStyles.gradientBase,
            "from-army/30 via-army/20 to-transparent"
          )}>
            <span className={cellStyles.text}>CTPL</span>
          </div>
        );
    }
  }, [props.type]);

  return <PolicyTypeWrapper>{content}</PolicyTypeWrapper>;
});
PolicyCoverageCell.displayName = "PolicyCoverageCell";

export const ServiceTypeCell = memo((props: { type: string | undefined }) => {
  const content = useMemo(() => {
    const gradientClass = props.type === "new"
      ? "from-amber-300/50 via-amber-300/20 to-amber-300/10 dark:from-slate-800/20"
      : "from-teal-300/50 via-teal-300/20 to-teal-300/10 dark:from-slate-800/20";

    return (
      <div className={cn(cellStyles.base, cellStyles.gradientBase, gradientClass)}>
        <span className={cellStyles.text}>
          {props.type === "new" ? "new" : "Renewal"}
        </span>
      </div>
    );
  }, [props.type]);

  return (
    <FlexRow className="h-6 w-32 items-center justify-center">
      {content}
    </FlexRow>
  );
});
ServiceTypeCell.displayName = "ServiceTypeCell";

export const StatusCell = memo((props: { status: string | undefined }) => {
  const content = useMemo(() => {
    const isSubmitted = props.status === "submitted";
    return (
      <div className={cn(
        cellStyles.base,
        isSubmitted
          ? "bg-gradient-to-tr from-secondary/50 via-secondary/10 to-transparent dark:bg-steel/15 dark:from-slate-800/20"
          : "bg-steel/10"
      )}>
        <span className={cellStyles.text}>
          {isSubmitted ? "submitted" : "draft"}
        </span>
      </div>
    );
  }, [props.status]);

  return (
    <div className="flex w-40 items-center justify-center">{content}</div>
  );
});
StatusCell.displayName = "StatusCell";

export const UserCell = memo((props: { id: string | undefined; agent?: boolean }) => {
  const { underwriters, vxusers, role } = useRequests();

  const vx = useMemo(() => {
    if (!props.id) return null;
    return props.agent
      ? vxusers?.find((u) => u.uid === props.id)
      : role === "underwriter"
        ? vxusers?.find((u) => u.role === "supervisor")
        : underwriters?.find((u) => u.uid === props.id);
  }, [props.id, props.agent, vxusers, role, underwriters]);

  if (!props.id) {
    return (
      <span className="flex h-6 items-center rounded-md border-[0.33px] border-primary-400 px-1.5 text-primary/60 text-xs">
        Not set
      </span>
    );
  }

  return (
    <User
      id={vx?.uid}
      name={vx?.nickname?.split(" ")[0]}
      description={
        <div className="flex items-center font-mono text-xs tracking-tight text-adam drop-shadow-sm hover:opacity-100 hover:drop-shadow-md dark:text-chalk" />
      }
      avatarProps={{
        src: vx?.photo_url,
        size: "sm",
        className: "size-4",
        fallback: getInitials(vx?.fullname),
      }}
      classNames={{
        name: "font-semibold text-sm text-primary/90 font-inter capitalize tracking-tighter",
        wrapper: "w-44 truncate",
      }}
    />
  );
});
UserCell.displayName = "UserCell";
