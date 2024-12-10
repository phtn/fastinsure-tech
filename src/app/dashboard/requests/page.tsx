import { type Metadata } from "next";
import { All } from "./all";

export const metadata: Metadata = {
  title: "All Requests",
  description: "View all created requests.",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};

export default async function Page() {
  return (
    <div className="-mx-8">
      <All />
    </div>
  );
}
