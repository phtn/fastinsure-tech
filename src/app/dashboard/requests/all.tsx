"use client";
import { cn } from "@/lib/utils";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { type SelectRequest } from "@convex/requests/d";
import {
  DocumentTextIcon,
  PaperAirplaneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { User } from "@nextui-org/react";
import { RotateCcwSquareIcon } from "lucide-react";
import moment from "moment";
import { type PropsWithChildren } from "react";
import { DataToolbar } from "./data-table.tsx/toolbar";
import { useRequests } from "./useRequests";

export const All = () => {
  return (
    <Container>
      <DataTable />
    </Container>
  );
};

type ColumnWidth = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
interface TableRowProps {
  value: string | number | undefined;
  size?: ColumnWidth;
  center?: boolean;
}
const HeaderItem = ({ value, size = "xs", center = false }: TableRowProps) => (
  <div
    className={cn(
      "w-24 text-xs font-semibold capitalize",
      {
        "w-28": size === "sm",
      },
      { "w-32": size === "md" },
      { "w-40": size === "lg" },
      { "w-48": size === "xl" },
      { "w-[11.5rem]": size === "2xl" },
      { "text-center": center },
    )}
  >
    {value}
  </div>
);

const RowItem = ({ value, size = "xs" }: TableRowProps) => (
  <div
    className={cn(
      "w-24 truncate text-xs capitalize",
      {
        "w-28": size === "sm",
      },
      { "w-32": size === "md" },
      { "w-40": size === "lg" },
      { "w-48": size === "xl" },
      { "w-[11rem]": size === "2xl" },
    )}
  >
    {value}
  </div>
);

const DataTableHeader = () => {
  return (
    <div className="flex h-8 items-center">
      <div className="flex">
        <HeaderItem value="request id" />
        <HeaderItem size="xl" value="assured info" />
        <HeaderItem size="2xl" value="agent" />
        <HeaderItem size="2xl" value="underwriter" />
        <HeaderItem size="md" value="policy type" center />
        <HeaderItem size="md" value="service type" center />
        <HeaderItem size="md" value="status" center />
        <HeaderItem size="lg" value="created at" />
        <HeaderItem size="lg" value="updated at" />
      </div>
    </div>
  );
};

const TableRow = (request: SelectRequest) => {
  return (
    <div className="flex h-20 items-center">
      <RowItem value={request?.request_id.split("-")[0]} />
      <RowItem size="xl" value={request?.assured_name} />
      <UserCell id={request?.agent_id} agent />
      <UserCell id={request?.underwriter_id} />
      <PolicyTypeCell type={request?.policy_type} />
      <ServiceTypeCell type={request?.service_type} />
      <StatusCell status={request?.status} />
      <DateCell date={request?._creationTime} />
      <DateCell date={request?.updated_at} />
    </div>
  );
};

const PolicyTypeCell = (props: { type: string | undefined }) => {
  const policyType = () => {
    switch (props.type) {
      case "auto":
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <TruckIcon className="size-3" />
            <span className="text-xs font-semibold capitalize tracking-tight">
              auto
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <TruckIcon className="size-3" />
            <span className="text-xs font-semibold capitalize tracking-tight">
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

const ServiceTypeCell = (props: { type: string | undefined }) => {
  const serviceType = () => {
    switch (props.type) {
      case "new":
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <SparklesIcon className="size-3" />
            <span className="text-xs font-semibold capitalize tracking-tight">
              Brand new
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <RotateCcwSquareIcon className="size-3" />
            <span className="text-xs font-semibold capitalize tracking-tight">
              Renewal
            </span>
          </div>
        );
    }
  };
  return (
    <FlexRow className="h-full w-32 items-center justify-center">
      {serviceType()}
    </FlexRow>
  );
};

const StatusCell = (props: { status: string | undefined }) => {
  const status = () => {
    switch (props.status) {
      case "submitted":
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <span className="text-xs font-semibold capitalize tracking-tight">
              Brand new
            </span>
            <PaperAirplaneIcon className="size-3 -rotate-[30deg]" />
          </div>
        );
      default:
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <span className="text-xs font-semibold capitalize tracking-tight">
              draft
            </span>
            <DocumentTextIcon className="size-3" />
          </div>
        );
    }
  };
  return (
    <div className="flex h-full w-32 items-center justify-center">
      {status()}
    </div>
  );
};

const DateCell = (props: { date: number | undefined }) => {
  return (
    <div className="w-40">
      <div className="text-sm font-medium tracking-tight">
        {moment(props?.date).calendar()}
      </div>
      <div className="text-[11px]">{moment(props?.date).fromNow()}</div>
    </div>
  );
};

const UserCell = (props: { id: string; agent?: boolean }) => {
  const { underwriters, vxusers } = useRequests();
  const vx = props.agent
    ? vxusers?.find((u) => u.uid === props.id)
    : underwriters?.find((u) => u.uid === props.id);
  return (
    <User
      id={vx?.uid}
      name={vx?.nickname}
      description={
        <div className="text-xs text-blue-500 drop-shadow-sm hover:text-blue-500 hover:opacity-100 hover:drop-shadow-md dark:text-secondary">
          {vx?.email}
        </div>
      }
      avatarProps={{
        src: vx?.photo_url,
        size: "sm",
      }}
      classNames={{
        name: " font-semibold text-primary/80 capitalize tracking-tight",
        wrapper: "w-[9rem] truncate",
      }}
    />
  );
};

interface DataTableRowProps {
  requests: SelectRequest[];
}

const DataTableRow = ({ requests }: DataTableRowProps) => {
  return (
    <HyperList
      data={requests}
      component={TableRow}
      itemStyle="border-b-[0.33px] border-primary-300/60"
    />
  );
};

const DataTable = () => {
  const { search, searchFn, filterFn, requests } = useRequests();
  const filteredRequests = filterFn(requests ?? []);

  return (
    <div className="w-full rounded-xl border-x-[0.5px] border-b-[0.5px] border-primary-300">
      <DataToolbar search={search} searchFn={searchFn} />
      <DataTableHeader />
      <DataTableRow requests={filteredRequests} />
    </div>
  );
};

const Container = ({ children }: PropsWithChildren) => (
  <div className="h-[calc(91.5vh)] w-full items-center justify-center">
    {children}
  </div>
);
