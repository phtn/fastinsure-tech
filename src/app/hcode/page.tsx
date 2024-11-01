import { HCodeContent } from "./content";
interface HCodePageProps {
  searchParams: { code: string; grp: string; nonce: string; sha: string };
}
const HCodePage = ({ searchParams }: HCodePageProps) => (
  <HCodeContent {...searchParams} />
);
export default HCodePage;
