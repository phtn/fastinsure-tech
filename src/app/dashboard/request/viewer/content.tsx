"use client";

import { useSearchParams } from "next/navigation";
import { RequestViewerProvider } from "./ctx";
import { Header } from "@/app/dashboard/components/header";
import { ContentBody } from "./body";

export const ViewerContent = () => {
  const searchParams = useSearchParams();
  const request_id = searchParams.get("rid");
  return (
    <main>
      <Header title="request" xs />
      <RequestViewerProvider request_id={request_id}>
        <ContentBody />
      </RequestViewerProvider>
    </main>
  );
};
