"use client";

import { useSearchParams } from "next/navigation";
import { RequestViewerContext } from "./ctx";
import { Header } from "@/app/dashboard/components/header";
import { ContentBody } from "./body";

export const ViewerContent = () => {
  const searchParams = useSearchParams();
  const request_id = searchParams.get("rid");
  return (
    <RequestViewerContext request_id={request_id}>
      <main>
        <Header title="request" xs />
        <ContentBody />
      </main>
    </RequestViewerContext>
  );
};
