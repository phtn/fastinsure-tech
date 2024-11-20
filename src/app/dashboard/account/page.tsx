import type { Metadata } from "next";
import { AccountContent } from "./content";
export const metadata: Metadata = {
  title: "Page",
  description: "Page metadata",
  icons: [{ rel: "icon", url: "/svg/icon.svg" }],
};
const Page = async () => {
  return <AccountContent />;
};
export default Page;
