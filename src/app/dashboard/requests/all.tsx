"use client";
import { cn } from "@/lib/utils";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { type SelectRequest } from "@convex/requests/d";
import {
  Bars2Icon,
  Bars4Icon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { User } from "@nextui-org/react";
import { RotateCcwSquareIcon } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, type PropsWithChildren } from "react";
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
      "w-24 text-xs font-semibold capitalize dark:text-slate-300",
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
    <div className="flex h-8 items-center justify-start border-b-[0.33px] border-dotted border-primary-300 tracking-tight">
      <HeaderItem value="id" center />
      <HeaderItem size="lg" value="created at" />
      <HeaderItem size="xl" value="assured" />
      <HeaderItem size="md" value="type" center />
      <HeaderItem size="md" value="coverage" center />
      <HeaderItem size="md" value="service" center />
      <HeaderItem size="lg" value="status" center />
      <HeaderItem size="2xl" value="agent" />
      <HeaderItem size="2xl" value="underwriter" />
    </div>
  );
};

const TableRow = (request: SelectRequest) => {
  return (
    <div className="flex h-20 items-center justify-start">
      <RequestIdCell id={request?.request_id} />
      <DateCell date={request?._creationTime} create />
      <RowItem size="xl" value={request?.assured_name} />
      <PolicyTypeCell type={request?.policy_type} />
      <PolicyCoverageCell type={request?.policy_coverage} />
      <ServiceTypeCell type={request?.service_type} />
      <StatusCell status={request?.status} />
      <UserCell id={request?.agent_id} agent />
      <UserCell id={request?.underwriter_id} />
    </div>
  );
};

const RequestIdCell = (props: { id: string }) => {
  const router = useRouter();
  const route = `/dashboard/request/viewer?rid=${props.id}`;
  router.prefetch(route);
  const viewRequest = useCallback(() => {
    router.push(route);
  }, [router, route]);
  return (
    <div
      onClick={viewRequest}
      className="flex w-24 items-center justify-center px-2 font-jet text-[11px] font-medium text-secondary drop-shadow-sm hover:cursor-pointer dark:text-secondary-300"
    >
      {props.id.split("-")[0]}
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

const PolicyCoverageCell = (props: { type: string | undefined }) => {
  const coverage = () => {
    switch (props.type) {
      case "comprehensive":
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <Bars4Icon className="size-3" />
            <span className="text-xs font-semibold capitalize tracking-tight">
              comprehensive
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <Bars2Icon className="size-3" />
            <span className="text-xs font-semibold capitalize tracking-tight">
              CTPL
            </span>
          </div>
        );
    }
  };
  return (
    <FlexRow className="h-full w-32 items-center justify-center">
      {coverage()}
    </FlexRow>
  );
};

const ServiceTypeCell = (props: { type: string | undefined }) => {
  const serviceType = () => {
    switch (props.type) {
      case "new":
        return (
          <div className="flex h-7 items-center gap-1.5 rounded-lg bg-amber-200/80 px-2 dark:bg-primary-300/40">
            <SparklesIcon className="size-3 text-amber-600 dark:text-amber-300" />
            <span className="capitalize tracking-tight">new</span>
          </div>
        );
      default:
        return (
          <div className="flex h-7 items-center gap-1.5 rounded-lg bg-indigo-200/80 px-2 dark:bg-primary-300/40">
            <RotateCcwSquareIcon className="size-3 text-indigo-600 dark:text-indigo-400" />
            <span className="capitalize tracking-tight">Renewal</span>
          </div>
        );
    }
  };
  return (
    <FlexRow className="h-full w-32 items-center justify-center text-xs font-semibold">
      {serviceType()}
    </FlexRow>
  );
};

const StatusCell = (props: { status: string | undefined }) => {
  const status = () => {
    switch (props.status) {
      case "submitted":
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-sky-200/80 px-2 dark:bg-primary-300/40">
            <span className="text-xs font-semibold capitalize tracking-tight">
              submitted
            </span>
            <PaperAirplaneIcon className="size-3 text-sky-600 -rotate-[30deg] dark:text-sky-300" />
          </div>
        );
      default:
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg bg-primary-300/40 px-2">
            <span className="text-xs font-semibold capitalize tracking-tight">
              draft
            </span>
            <DocumentTextIcon className="size-3 text-primary-600/80" />
          </div>
        );
    }
  };
  return (
    <div className="flex h-full w-40 items-center justify-center">
      {status()}
    </div>
  );
};

const DateCell = (props: { date: number | undefined; create?: boolean }) => {
  return (
    <div className="w-40">
      <div
        className={cn(
          "text-xs font-medium tracking-tight dark:text-indigo-200",
          { "dark:text-warning-100/90": props.create },
        )}
      >
        {moment(props?.date).calendar()}
      </div>
      <div className="text-[11px] dark:text-steel">
        {moment(props?.date).fromNow()}
      </div>
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
        <div className="text-xs text-secondary drop-shadow-sm hover:opacity-100 hover:drop-shadow-md dark:text-secondary-300">
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
      itemStyle="border-b-[0.33px] border-primary-300/60 last:border-0"
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
