import { useAuthCtx, withAuth } from "@/app/ctx/auth/auth";
import { CreateAgentCode, CreateRequest } from "./comp/actions";
import { Splash } from "./comp/splash";
import { Flag } from "./comp/status-flag";
import { UpdatesComponent } from "./comp/updates";
import type { SelectUser } from "@convex/users/d";
import { Tab, Tabs } from "@nextui-org/react";

const MOverview = () => {
  const { user, vxuser } = useAuthCtx();

  return (
    <div className="h-screen overflow-auto rounded-tl-3xl p-4">
      <OverviewHeader email={user?.email} vxuser={vxuser} />
      <Tabs size="md" variant="underlined" classNames={{
        cursor: "bg-macl-blue"
      }}>
        <Tab key="functions" title="Functions">
          <div className="h-full w-full px-2 space-y-4 text-foreground">
            <CreateAgentCode />
            <CreateRequest />
          </div>
        </Tab>
        <Tab key="stats" title="Stats">
          <UpdatesComponent />
        </Tab>
      </Tabs>

    </div>
  );
};
export const ManagerOverview = withAuth(MOverview);


interface OverviewHeaderProps {
  email: string | null | undefined;
  vxuser: SelectUser | null;
}

const OverviewHeader = ({ email, vxuser }: OverviewHeaderProps) => {
  return (
    <Splash text={"Overview"}>
      <div>
        <div className="absolute top-4 z-[60] flex h-1/2 w-1/3  items-center space-x-2 border-primary px-12 font-inst text-xl delay-1000">
          <p>{email}</p>
        </div>
        <div className="absolute bottom-0 z-[60] h-1/2 w-full px-12">
          <Flag
            metric={vxuser?.group_code !== ""}
            label={["account", vxuser?.group_code, "NOT REGISTERED"]}
            />
          <Flag
            metric={vxuser?.group_code !== "NEW NOT REGISTERED"}
            label={["status", "active", "inactive"]}
          />
        </div>
      </div>
    </Splash>
  )
}
