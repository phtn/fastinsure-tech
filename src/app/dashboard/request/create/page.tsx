import { type Metadata } from "next";
import { Content } from "./content";

export const metadata: Metadata = {
  title: "Request Form ",
  description: "Create and Edit Requests Page",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};
const Page = async () => {
  return <Content />;
};
export default Page;
