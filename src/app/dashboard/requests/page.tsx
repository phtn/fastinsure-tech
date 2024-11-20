import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "All Requests",
  description: "View all created requests.",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};

export default async function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center rounded-lg bg-gray-200 text-4xl font-bold text-secondary">
      ALL REQS
    </div>
  );
}
