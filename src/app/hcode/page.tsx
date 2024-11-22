import { HCodeContent } from "./content";

// type Params = Promise<{ slug: string }>
// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = await params
// }
//

// export async function generateMetadata(props: {
//   params: Params
//   searchParams: SearchParams
// })

export default async function Page() {
  return <HCodeContent />;
}
