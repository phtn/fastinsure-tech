import { Dashboard } from "./dashboard";
export interface AuthdPageProps {
  params: {
    uid: string | undefined;
  };
}
const AuthdPage = async () => <Dashboard />;
export default AuthdPage;
