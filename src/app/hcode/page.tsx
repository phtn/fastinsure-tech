import { HCodeContent } from "./content";
interface HCodePageProps {
  searchParams: { key?: string; group?: string; nonce?: string; sha?: string };
}
const HCodePage = ({ searchParams }: HCodePageProps) => (
  <HCodeContent {...searchParams} />
);
export default HCodePage;
