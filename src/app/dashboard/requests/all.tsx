"use client";

import { memo, type PropsWithChildren, useMemo } from "react";
import { useRequests } from "./useRequests";
import { DataToolbar } from "./table-components/toolbar";
import { DataTableHeader } from "./table-components/header";
import { DataTableRow } from "./table-components/table-row";

const DataTable = memo(({ children }: PropsWithChildren) => {
  return <div className="w-full rounded-xl">{children}</div>;
});
DataTable.displayName = "DataTable";

const Container = memo(({ children }: PropsWithChildren) => (
  <div className="h-[calc(91.5vh)] w-full items-center justify-center">
    {children}
  </div>
));
Container.displayName = "Container";

export const All = memo(() => {
  const { search, searchFn, filterFn, requests, role } = useRequests();
  
  const filteredRequests = useMemo(
    () => filterFn(requests ?? [], 25),
    [filterFn, requests]
  );

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
});
All.displayName = "All";
