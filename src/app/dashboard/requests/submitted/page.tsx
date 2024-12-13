// import { type Metadata } from "next";
import { SubmittedRequests } from "./content";

// export const metadata: Metadata = {
//   title: "Submitted Requests",
//   description: "All submitted requests",
//   icons: [{ rel: "icon", url: "/svg/f.svg" }],
// };
export default async function SubmittedPage() {
  return (
    <div>
      <SubmittedRequests />
    </div>
  );
}
