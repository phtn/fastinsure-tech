import { useAuthCtx, withAuth } from "@/app/ctx/auth/auth";
import { motion } from "framer-motion";
import { CreateAgentCode, CreateRequest } from "./comp/actions";
import { Splash } from "./comp/splash";
import { Flag } from "./comp/status-flag";
import { UpdatesComponent } from "./comp/updates";
import type { SelectUser } from "@convex/users/d";

const MOverview = () => {
  const { user, vxuser } = useAuthCtx();

  return (
    <div className="h-[98vh] overflow-auto rounded-tl-3xl p-4">
      <OverviewHeader email={user?.email} vxuser={vxuser} />
      <div className="h-full w-full space-y-4 text-foreground">
        <span className="text-secondary">⏺</span> Actions
        <CreateAgentCode />
        <CreateRequest />
      </div>
      <UpdatesComponent />
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
    <Splash text={""}>
            <div>
              <div className="absolute top-4 z-[60] flex h-1/2 w-1/3  items-center space-x-2 border-primary px-12 font-inst text-xl delay-1000">
                <p>{email}</p>
              </div>
              <div className="absolute bottom-0 z-[60] h-1/2 w-full px-12">
                <motion.section
                  initial={{ height: "0%" }}
                  animate={{ height: "66%" }}
                  transition={{ duration: 2, delay: 3 }}
                  className="flex h-2/3 w-full flex-col items-start justify-start space-y-[2px] border-l-[0.33px] border-primary/40"
                >
                  <Flag
                    metric={vxuser?.group_code !== ""}
                    label={["account", vxuser?.group_code, "NOT REGISTERED"]}
                  />
                  <Flag
                    metric={vxuser?.group_code !== "NEW NOT REGISTERED"}
                    label={["status", "active", "inactive"]}
                  />
                </motion.section>
              </div>
            </div>
          </Splash>
  )
}
