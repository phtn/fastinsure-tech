import { useAuthCtx, withAuth } from "@/app/ctx/auth/auth";
import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { motion } from "framer-motion";
import { CreateAgentCode, CreateRequest } from "./comp/actions";
import { Splash } from "./comp/splash";
import { Flag } from "./comp/status-flag";
import { UpdatesComponent } from "./comp/updates";
import { Separator } from "@/ui/separator";

const MOverview = () => {
  const { user, vxuser } = useAuthCtx();

  return (
    <div className="h-[99vh] overflow-auto rounded-tl-3xl p-4">
      <Splash text={""}>
        <div>
          <div className="absolute top-4 z-[60] flex h-1/2 w-1/3 items-center space-x-2 border-primary px-12 font-inst text-xl delay-1000">
            <p>{user?.email}</p>
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
                metric={!!vxuser && vxuser?.group_code !== "NEO"}
                label={["status", "active", "inactive"]}
              />
            </motion.section>
          </div>
        </div>
      </Splash>
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              <div className="h-full w-full space-y-4 text-foreground">
                <Widget.Title><span className="text-secondary">⏺</span> Actions</Widget.Title>
                <CreateAgentCode />
                <CreateRequest />
              </div>
            </HStack.XsCol>

            <HStack.SmCol>
              <UpdatesComponent />
            </HStack.SmCol>
            {/* <HStack.XsCol>
              <div className="h-full w-full text-background"></div>
            </HStack.XsCol> */}
          </HStack>
        </Widget.BaseII>
      </Widget>
      <Separator className="my-12 opacity-0" />
      <Widget>
        <Widget.BaseII>
          <HStack>
            <HStack.LgCol></HStack.LgCol>
          </HStack>
        </Widget.BaseII>
      </Widget>
    </div>
  );
};
export const ManagerOverview = withAuth(MOverview);
