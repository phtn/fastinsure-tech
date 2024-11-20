import { type Metadata } from "next";
import { RequestFormContent } from "./content";

export const metadata: Metadata = {
  title: "Request Form ",
  description: "Create and Edit Requests Page",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};
const RequestFormPage = async () => {
  return <RequestFormContent />;
};
export default RequestFormPage;
