import { HyperList } from "@/ui/list";
import { type SelectRequest } from "@convex/requests/d";
import { memo } from "react";
import {
  RequestIdCell,
  DateCell,
  AssuredCell,
  PolicyTypeCell,
  PolicyCoverageCell,
  ServiceTypeCell,
  StatusCell,
  UserCell,
} from "./cellts";

interface DataTableRowProps {
  requests: SelectRequest[];
}

export const DataTableRow = ({ requests }: DataTableRowProps) => {
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

const TableRow = (request: SelectRequest) => {
  return (
    <div className="flex h-20 items-center justify-start">
      <RequestIdCell id={request?.request_id} />
      <DateCell date={request?._creationTime} create />
      <AssuredCell name={request?.assured_name} email={request?.assured_email} />
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
