"use client";
import { cn } from "@/lib/utils";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { type SelectRequest } from "@convex/requests/d";
import {
  ArrowLongUpIcon,
  ChevronDoubleUpIcon,
  ChevronUpIcon,
  PencilIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { User } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, type PropsWithChildren } from "react";
import { DataToolbar } from "./data-table.tsx/toolbar";
import { useRequests } from "./useRequests";
import { RotateCcwSquareIcon } from "lucide-react";

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
      <AssuredCell id={request?.subject_id} />
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
          <div className="flex h-8 items-center gap-2 rounded-lg border border-slate-400 bg-slate-400/30 px-2">
            <TruckIcon className="size-4" />
            <span className="text-xs font-semibold capitalize tracking-tight">
              auto
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-8 items-center gap-2 rounded-lg bg-primary-100 px-2">
            <TruckIcon className="size-4" />
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
          <div className="flex h-8 items-center gap-2 rounded-lg border border-steel bg-steel/50 px-2">
            <ChevronDoubleUpIcon className="size-4 stroke-2 dark:text-rose-300" />
            <span className="text-xs font-semibold uppercase tracking-tight">
              full
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-8 items-center gap-2 rounded-lg border border-steel bg-steel/15 px-2">
            <ChevronUpIcon className="size-4 stroke-2 dark:text-secondary-300" />
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
          <div className="flex h-8 items-center gap-1.5 rounded-lg border border-warning/80 bg-warning-100/60 px-2 dark:bg-primary-300/40">
            <SparklesIcon className="size-4 stroke-2 text-warning-700 drop-shadow-sm dark:text-warning-100" />
            <span className="capitalize tracking-tight">new</span>
          </div>
        );
      default:
        return (
          <div className="flex h-8 items-center gap-1.5 rounded-lg border border-indigo-400/80 bg-indigo-100/80 px-2 dark:bg-primary-300/40">
            <RotateCcwSquareIcon className="size-4 stroke-2 text-indigo-600 dark:text-indigo-400" />
            <span className="capitalize tracking-tight">Renew</span>
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
          <div className="flex h-8 items-center gap-2 rounded-lg border border-secondary/80 bg-secondary-100/80 px-2 dark:bg-primary-300/40">
            <span className="text-xs font-semibold capitalize tracking-tight">
              submitted
            </span>
            <ArrowLongUpIcon className="size-4 stroke-2 text-secondary dark:text-secondary" />
          </div>
        );
      default:
        return (
          <div className="flex h-8 items-center gap-2 rounded-lg border border-primary-300 bg-primary-300/40 px-2">
            <span className="text-xs font-semibold capitalize tracking-tight">
              draft
            </span>
            <PencilIcon className="stroke size-4 text-primary-600/80 -rotate-12" />
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
        {moment(props?.date).format("lll")}
      </div>
      <div className="space-x-1 text-[11px] dark:text-steel">
        <span>{moment(props?.date).format("ddd")}</span>
        <span>{moment(props?.date).fromNow()}</span>
      </div>
    </div>
  );
};

const AssuredCell = (props: { id: string | undefined }) => {
  const { vxsubjects } = useRequests();

  const subject = useMemo(
    () => vxsubjects?.find((s) => s.subject_id === props.id),
    [props.id, vxsubjects],
  );

  console.log(vxsubjects);

  return (
    <div className="w-48">
      <div
        className={cn(
          "text-xs font-medium tracking-tight dark:text-indigo-200",
        )}
      >
        {subject?.email ?? props.id}
      </div>
      <div className="space-x-1 text-[11px] dark:text-steel">
        {/* <span>{props.email ?? props.phone_number}</span> */}
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
