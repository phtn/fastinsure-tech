"use client";

import { DataTable } from "./table";
import { columns } from "./column";
import { useRequests } from "../useRequests";
import { Loader } from "@/ui/loader";

export const AllData = () => {
  const { requests, pending } = useRequests();
  if (pending) return <Loader />;

  return (
    <DataTable
      data={requests ?? []}
      loading={false}
      toolbarActions={[false, () => false]}
      columns={columns}
    />
  );
};

export const fake_req = [
  {
    request_id: "984Coffee",
    assured_name: "name_01",
    agent_name: "agent_name_01",
  },
  {
    request_id: "Cocaine",
    assured_name: "name_02",
    agent_name: "agent_name_02",
  },
  {
    request_id: "Meth",
    assured_name: "name_03",
    agent_name: "agent_name_03",
  },
  {
    request_id: "Pot",
    assured_name: "name_04",
    agent_name: "agent_name_04",
  },
  {
    request_id: "Heroine",
    assured_name: "name_05",
    agent_name: "agent_name_05",
  },
  {
    request_id: "Acid",
    assured_name: "name_06",
    agent_name: "agent_name_06",
  },
  {
    request_id: "DMT",
    assured_name: "name_07",
    agent_name: "agent_name_07",
  },
  {
    request_id: "DMT2",
    assured_name: "name_08",
    agent_name: "agent_name_08",
  },
];
