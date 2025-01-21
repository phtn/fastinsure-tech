"use client";

import { useSearchParams } from "next/navigation";
import { RequestViewerContext } from "./ctx";
import { Header } from "@/app/dashboard/components/header";
import { ContentBody } from "./body";

export const ViewerContent = () => {
  const searchParams = useSearchParams();
  const request_id = searchParams.get("rid");
  return (
    <main>
      <Header title="request" xs />

      <RequestViewerContext request_id={request_id}>
        <ContentBody />
      </RequestViewerContext>
    </main>
  );
};
