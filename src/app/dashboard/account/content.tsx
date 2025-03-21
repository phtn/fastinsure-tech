"use client";

import { AccountSummary, TabComponent } from "./components";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { AccountContext } from "./ctx";
import { Pfp } from "./pfp";

export const AccountContent = () => {
  const { vxuser } = useAuthCtx();

  return (
    <AccountContext>
      <main className="h-screen w-full overflow-y-scroll bg-background pb-56">
        <Pfp />
        <AccountSummary
          name={vxuser?.nickname ?? vxuser?.email ?? ""}
          verified={false}
          group_code={vxuser?.group_code ?? ""}
        />
        <div className="w-full pb-24">
          <div className="h-96 w-full border-void/20">
            <TabComponent />
          </div>
        </div>
      </main>
    </AccountContext>
  );
};
