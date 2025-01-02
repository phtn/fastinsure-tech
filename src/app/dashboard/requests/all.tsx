"use client";
import { cn } from "@/lib/utils";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { type SelectRequest } from "@convex/requests/d";
import { ArrowLongUpIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import { User } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo, type PropsWithChildren } from "react";
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

const TableRow = (request: SelectRequest) => {
  const router = useRouter();
  const routeToRequest = useCallback(() => {
    const route = `/dashboard/request/viewer?rid=${request?.request_id}`;
    router.push(route);
  }, [router, request?.request_id]);
  return (
    <div className="flex h-20 items-center justify-start">
      <RequestIdCell routeFn={routeToRequest} id={request?.request_id} />
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

const MemoizedTableRow = memo(TableRow);

const RequestIdCell = (props: { id: string; routeFn: VoidFunction }) => {
  return (
    <button
      onClick={props.routeFn}
      className="flex h-8 w-24 items-start justify-center px-2 font-jet text-[11px] font-medium text-adam underline-offset-2 drop-shadow-sm hover:cursor-pointer hover:underline dark:text-secondary-300"
    >
      {props.id.split("-")[0]}
    </button>
  );
};

const PolicyTypeCell = (props: { type: string | undefined }) => {
  const policyType = () => {
    switch (props.type) {
      case "auto":
        return (
          <div className="flex h-fit items-center gap-2 rounded-lg bg-gradient-to-tr from-army/30 via-cake/10 to-transparent px-1">
            <span className="font-inst text-sm font-semibold capitalize tracking-tight">
              auto
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-8 items-center gap-2 rounded-lg bg-primary-100 px-2">
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
          <div className="bg-coal flex h-7 items-center gap-2 rounded-lg px-2 dark:bg-steel/15">
            <span className="text-xs font-semibold uppercase tracking-tight">
              full
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-7 items-center gap-2 rounded-lg px-2">
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
          <div className="to-cool flex h-fit items-center gap-1.5 rounded-md bg-gradient-to-tr from-orange-300/50 via-orange-200/10 px-1 dark:bg-primary-300/40">
            <span className="font-inst text-sm font-semibold capitalize tracking-tight text-orange-950">
              new
            </span>
          </div>
        );
      default:
        return (
          <div className="flex h-fit items-center gap-1.5 rounded-md bg-gradient-to-tr from-teal-300/50 via-teal-200/10 to-transparent px-1 dark:bg-primary-300/40">
            <span className="font-inter text-sm capitalize tracking-tight text-teal-950">
              Renew
            </span>
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
          <div className="flex h-fit items-center rounded-md bg-gradient-to-tr from-blue-300/50 via-blue-200/10 to-transparent ps-1 dark:bg-steel/15">
            <span className="text-sm font-semibold capitalize tracking-tight text-blue-950">
              submitted
            </span>
            <ArrowLongUpIcon className="size-4 stroke-2 text-secondary dark:text-secondary" />
          </div>
        );
      default:
        return (
          <div className="flex h-8 items-center gap-4 rounded-lg border border-primary-300 bg-steel/10 px-2">
            <span className="text-xs font-semibold capitalize tracking-tight">
              draft
            </span>
            <PencilIcon className="size-3.5 stroke-1 text-primary-600/80 -rotate-[35deg]" />
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
  const data = useRequests().vxsubjects;
  // const data = useQuery(api.subjects.get.all);
  //
  const subject = useMemo(
    () => data?.find((s) => s.subject_id === props.id),
    [props.id, data],
  );

  return (
    <div className="w-48">
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

const UserCell = (props: { id: string; agent?: boolean }) => {
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
        <div className="flex items-center font-mono text-xs tracking-tight text-adam drop-shadow-sm hover:opacity-100 hover:drop-shadow-md dark:text-secondary-300">
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
        name: " font-semibold text-primary/90 font-inter capitalize tracking-tight",
        wrapper: "w-[9rem] truncate",
      }}
    />
  ) : (
    <span className="flex h-[36px] items-center rounded-xl border border-primary-300/60 bg-steel/10 px-3 font-jet text-sm">
      Not set
    </span>
  );
};

interface DataTableRowProps {
  requests: SelectRequest[];
}

const DataTableRow = ({ requests }: DataTableRowProps) => {
  return (
    <HyperList
      data={requests}
      component={MemoizedTableRow}
      container="h-[calc(84vh)] overflow-y-scroll"
      itemStyle="border-b-[0.33px] border-primary-300/60 last:border-0"
      orderBy="_creationTime"
    />
  );
};

const DataTableHeader = (props: { role: string | undefined }) => {
  return (
    <div className="flex h-8 items-center justify-start border-b-[0.33px] border-dotted border-primary-300 bg-steel/20 tracking-tight text-adam dark:bg-adam">
      <HeaderItem value="id" center />
      <HeaderItem size="lg" value="created at" />
      <HeaderItem size="xl" value="assured" />
      <HeaderItem size="md" value="type" center />
      <HeaderItem size="md" value="coverage" center />
      <HeaderItem size="md" value="service" center />
      <HeaderItem size="lg" value="status" center />
      <HeaderItem size="2xl" value="agent" />
      <HeaderItem
        size="2xl"
        value={props.role === "underwriter" ? "supervisor" : "underwriter"}
      />
    </div>
  );
};

const DataTable = () => {
  const { search, searchFn, filterFn, requests, role } = useRequests();
  const filteredRequests = filterFn(requests ?? [], 25);

  return (
    <div className="w-full rounded-xl">
      <DataToolbar
        count={filteredRequests.length}
        search={search}
        searchFn={searchFn}
      />
      <DataTableHeader role={role} />
      <DataTableRow requests={filteredRequests} />
    </div>
  );
};

const Container = ({ children }: PropsWithChildren) => (
  <div className="h-[calc(91.5vh)] w-full items-center justify-center">
    {children}
  </div>
);
