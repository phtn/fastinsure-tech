import { type Metadata } from "next";
import { RequestFormContent } from "./content";

interface Props {
  params: {
    rid: string | undefined;
  };
}
export const metadata: Metadata = {
  title: "Request Form - ",
  description: "Create and Edit Requests Page",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};
const RequestFormPage = async ({ params }: Props) => {
  console.log("RequestFormPage:params", params);
  return <RequestFormContent />;
};
export default RequestFormPage;
