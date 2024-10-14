import { Dashboard } from "./dashboard";
import { Overview } from "./overview";

export const AuthedContent = () => {
  return (
    <Dashboard>
      <Overview />
    </Dashboard>
  );
};
