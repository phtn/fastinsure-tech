import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "All Requests",
  description: "View all created requests.",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};

export default async function Page() {
  return (
    <div className="-mx-8 flex h-[calc(88vh)] items-center justify-center rounded-t-lg bg-gray-200/30 text-4xl font-bold text-secondary">
      ALL REQS
    </div>
  );
}
