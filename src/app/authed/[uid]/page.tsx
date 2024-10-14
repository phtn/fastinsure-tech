import { AuthedContent } from "./content";
export interface AuthdPageProps {
  params: {
    uid: string | undefined;
  };
}
const AuthdPage = async () => <AuthedContent />;
export default AuthdPage;
