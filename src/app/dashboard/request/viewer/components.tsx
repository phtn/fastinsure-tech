import moment from "moment";
import type { ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { toggleState } from "@/utils/helpers";
import type { SelectUser } from "@convex/users/d";
import {
  DocumentTextIcon,
  PaperAirplaneIcon,
  ArrowPathRoundedSquareIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import { Avatar } from "@nextui-org/react";
import { CheckCircleIcon, SparklesIcon, ClockIcon } from "lucide-react";
import { useState, useCallback, type FC, memo, type ReactNode } from "react";

const UserPill = (props: { vx: SelectUser | undefined; label: string }) => {
  return (
    <ButtSex size="lg">
      <Avatar
        src={props.vx?.photo_url}
        className={cn("mr-4 shrink-0 border border-warning-300", {
          "border-indigo-400": props.label === "underwriter",
        })}
        size="sm"
      />
      <div className="w-full text-left">
        <p>{props.vx?.nickname}</p>
        <p
          className={cn(
            "font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-secondary-300",
            { "dark:text-indigo-300": props.label === "underwriter" },
          )}
        >
          {props.label}
        </p>
      </div>
    </ButtSex>
  );
};

const Status = (props: { status: string | undefined }) => {
  return (
    <ButtSex
      size="lg"
      start={
        props.status === "draft"
          ? DocumentTextIcon
          : props.status === "submitted"
            ? PaperAirplaneIcon
            : CheckCircleIcon
      }
    >
      <div className="w-full text-left">
        <p>{props.status}</p>
        <p className="font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-secondary-300">
          status
        </p>
      </div>
    </ButtSex>
  );
};

const PolicyPill = (props: { type: string | undefined; label: string }) => {
  return (
    <ButtSex
      size="lg"
      start={
        props.label === "issuance"
          ? props.type === "new"
            ? SparklesIcon
            : ArrowPathRoundedSquareIcon
          : RectangleStackIcon
      }
    >
      <div className="w-full text-left">
        <p>{props.type}</p>
        <p className="font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-pink-200">
          {props.label}
        </p>
      </div>
    </ButtSex>
  );
};

const CreatedAt = ({ created }: { created: number | undefined }) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = useCallback(() => toggleState(setToggle), [setToggle]);
  return (
    <ButtSex size="lg" start={ClockIcon} onClick={handleToggle}>
      <div className="w-40 text-left">
        {toggle ? (
          <p className="">{moment(created).format("lll")}</p>
        ) : (
          <p>
            {moment(created).format("dddd")}
            <span className="px-2 dark:text-adam">⏺</span>

            <span className="lowercase">{moment(created).fromNow()}</span>
          </p>
        )}
        <p className="font-jet text-[11px] font-normal lowercase drop-shadow-sm dark:text-warning-300">
          {toggle ? "created on" : "created on"}
        </p>
      </div>
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
    className={`flex items-center px-4 odd:bg-primary-100/30 ${className}`}
  >
    <div
      className={`flex w-36 items-center font-jet text-adam dark:text-steel ${className}`}
    >
      {keyName}
    </div>
    <div
      className={`flex w-fit items-center font-jet font-medium ${className}`}
    >
      {formatValue(value)}
    </div>
  </div>
);

export const excludeProps = <T,>(o: T | null, keys: string[]) =>
  o && Object.entries(o).filter(([k, _]) => !keys.includes(k));

const RequestIdComp = ({ id }: { id: string | undefined }) => (
  <FlexRow className="absolute right-6 top-5 z-40 h-fit w-full items-center justify-end">
    <h2 id="request-id" className="font-jet text-sm text-adam dark:text-steel">
      Request ID: {id}
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
  children,
}: ITopPanel) => (
  <FlexRow className="h-fit w-full items-center justify-between px-4">
    <FlexRow className="h-fit items-center">
      <PolicyPill type={service_type} label="issuance" />
      <PolicyPill type={policy_coverage} label="policy coverage" />
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
    {children}
  </FlexRow>
);
export const TopPanel = memo(TopPanelComp);
