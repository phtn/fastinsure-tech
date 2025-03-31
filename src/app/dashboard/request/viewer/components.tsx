"use client";

import moment from "moment";
import type { ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import type { SelectUser } from "@convex/users/d";
import { Avatar } from "@nextui-org/react";
import { type FC, memo, type ReactNode, useMemo } from "react";
import { useToggle } from "@/utils/hooks/useToggle";

const UserPill = (props: { vx: SelectUser | undefined; label: string }) => {
  return (
    <ButtSex size="lg">
      <Avatar className="mr-2.5 shrink-0" src={props.vx?.photo_url} size="sm" />
      <PillDetail value={props.vx?.nickname} label={props.label} />
    </ButtSex>
  );
};

const Status = (props: { status: string | undefined }) => {
  return (
    <ButtSex
      size="lg"
      start={
        props.status === "draft"
        ? "file-right"
          : props.status === "submitted"
            ? "mail-send"
            : "check"
      }
    >
      <PillDetail value={props.status} label="status" />
    </ButtSex>
  );
};

const PolicyPill = (props: { type: string | undefined; label: string }) => {
  return (
    <ButtSex
      size="lg"
      start={
        props.label === "policy"
          ? props.type === "new"
            ? "sparkle"
            : "refresh-circle"
          : "box-linear"
      }
    >
      <PillDetail value={props.type} label={props.label} />
    </ButtSex>
  );
};

const CreatedAt = ({ created }: { created: number | undefined }) => {
  const { open, toggle } = useToggle();
  const value = useMemo(() => {
    const v1 = moment(created).format("lll");
    const v2 = (
      <>
        <span>{moment(created).format("dddd")}</span>
        <span className="px-2.5 opacity-30">⏺</span>
        <span className="lowercase">{moment(created).fromNow()}</span>
      </>
    );
    return open ? v1 : v2;
  }, [created, open]);
  return (
    <ButtSex size="lg" start={"clock"} onClick={toggle}>
      <PillDetail
        value={value}
        label={open ? "created on" : "created on"}
        className="w-40"
      />
    </ButtSex>
  );
};

// Helper function to format values
const formatValue = (value: string | number): string => {
  return typeof value === "number"
    ? moment(value).format("MMMM Do YYYY, h:mm:ss a")
    : String(value);
};

// Component for rendering a row
export const RenderRow: FC<{
  keyName: string;
  value: string | number;
  className: ClassName;
}> = ({ keyName, value, className }) => (
  <div
    key={keyName}
    style={{ display: "flex", alignItems: "center", height: "36px" }}
    className={`flex items-center px-4 odd:bg-steel/10 ${className}`}
  >
    <div
      className={`flex w-36 items-center font-jet text-adam capitalize dark:text-steel ${className}`}
    >
      {keyName.replaceAll("_", " ")}
    </div>
    <div
      className={`flex w-fit items-center font-jet uppercase font-medium ${className}`}
    >
      {formatValue(value)}
    </div>
  </div>
);

export const excludeProps = <T,>(o: T | null, keys: string[]) =>
  o && Object.entries(o).filter(([k]) => !keys.includes(k));

const RequestIdComp = ({ id }: { id: string | undefined }) => (
  <FlexRow className="absolute left-48 top-[22px] z-40 h-fit w-full items-center">
    <h2
      id="request-id"
      className="font-jet text-sm tracking-wide text-adam dark:text-steel"
    >
      id: {id}
    </h2>
  </FlexRow>
);

export const RequestId = memo(RequestIdComp);

export interface ITopPanel {
  service_type: string | undefined;
  policy_coverage: string | undefined;
  _creationTime: number | undefined;
  status: string | undefined;
  vxund: SelectUser | undefined;
  vxusr: SelectUser | undefined;
  vxusers: SelectUser[] | null;
  role: string | undefined;
  children?: ReactNode;
}

const TopPanelComp = ({
  service_type,
  _creationTime,
  policy_coverage,
  status,
  vxusr,
  vxund,
  vxusers,
  role,
}: ITopPanel) => (
  <FlexRow className="h-fit w-full items-center space-x-1 from-void/40 to-void/20 px-4 py-2 backdrop-blur-xl dark:bg-gradient-to-r">
    <PolicyPill type={service_type} label="policy" />
    <PolicyPill type={policy_coverage} label="coverage" />
    <CreatedAt created={_creationTime} />
    <UserPill vx={vxusr} label="created by" />
    <UserPill
      vx={
        role === "underwriter"
          ? vxund
          : vxusers?.find((u) => u.role === "supervisor")
      }
      label={role === "underwriter" ? "supervisor" : "underwriter"}
    />
    <Status status={status} />
  </FlexRow>
);
export const TopPanel = memo(TopPanelComp);

interface IPillDetal {
  value: ReactNode | undefined;
  label?: string;
  className?: ClassName;
}
const PillDetail = (props: IPillDetal) => (
  <div
    className={cn(
      "flex w-full text-left font-sans text-sm font-medium leading-none",
      props.className,
    )}
  >
    <div>
      <p className="h-4">{props.value}</p>
      <p className="h-4 font-normal lowercase opacity-60">{props.label}</p>
    </div>
  </div>
);
