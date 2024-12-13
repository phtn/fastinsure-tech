import { headers } from "next/headers";
import { Dashboard } from "./content";
const DashboardPage = async () => {
  const hres = await headers();
  const userAgent = hres.get("user-agent");

  return <Dashboard userAgent={userAgent} />;
};
export default DashboardPage;
