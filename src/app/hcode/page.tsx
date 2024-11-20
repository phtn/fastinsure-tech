// import { HCodeContent } from "./content";

// type Params = Promise<{ slug: string }>
// export async function generateMetadata({ params }: { params: Params }) {
//   const { slug } = await params
// }
//
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

// export async function generateMetadata(props: {
//   params: Params
//   searchParams: SearchParams
// })

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;

  return (
    <div className="container h-96 p-10 text-primary">
      {slug} | {query}
    </div>
  );
}
