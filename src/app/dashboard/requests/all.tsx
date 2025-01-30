"use client";

import { type PropsWithChildren } from "react";
import { useRequests } from "./useRequests";
import { DataToolbar } from "./table-components/toolbar";
import { DataTableHeader } from "./table-components/header";
import { DataTableRow } from "./table-components/table-row";

export const All = () => {
  const { search, searchFn, filterFn, requests, role } = useRequests();
  const filteredRequests = filterFn(requests ?? [], 25);

  return (
    <Container>
      <DataTable>
        <DataToolbar
          count={filteredRequests.length}
          search={search}
          searchFn={searchFn}
        />
        <DataTableHeader role={role} />
        <DataTableRow requests={filteredRequests} />
      </DataTable>
    </Container>
  );
};

const DataTable = ({ children }: PropsWithChildren) => {
  return <div className="w-full rounded-xl">{children}</div>;
};

const Container = ({ children }: PropsWithChildren) => (
  <div className="h-[calc(91.5vh)] w-full items-center justify-center">
    {children}
  </div>
);
