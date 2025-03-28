import { All } from "./all";

// export const metadata: Metadata = {
//   title: "My Team",
//   description: "Viewing all my team.",
//   icons: [{ rel: "icon", url: "/svg/f.svg" }],
// };

export default async function Page() {
  return (
    <main className="-mx-8 h-[calc(88vh)]">
      <All />
    </main>
  );
}
