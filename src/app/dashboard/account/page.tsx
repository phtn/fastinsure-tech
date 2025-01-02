import type { Metadata } from "next";
import { AccountContent } from "./content";

export const metadata: Metadata = {
  title: "Account Page",
  description: "Account settings page",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};
const Page = async () => {
  return <AccountContent />;
};
export default Page;
