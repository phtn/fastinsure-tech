import { type Metadata } from "next";
import { RequestsDefaultContent } from "./content";

export const metadata: Metadata = {
  title: "Requests",
  description: "Requests default page",
  icons: [{ rel: "icon", url: "/svg/icon.svg" }],
};

const RequestDefaultPage = async () => {
  return <RequestsDefaultContent />;
};
export default RequestDefaultPage;
