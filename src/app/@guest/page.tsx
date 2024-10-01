import { type Metadata } from "next";
import { MainContent } from "./content";
export const metadata: Metadata = {
  title: "FastInsureTech",
  description: "v10",
  icons: [{ rel: "icon", url: "/svg/f.svg" }],
};
const Main = async () => <MainContent />;
export default Main;
