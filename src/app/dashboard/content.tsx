"use client";

import { AgentOverview } from "./overview/a-overview";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { ManagerOverview } from "./overview/m-overview";
import { Loader } from "@/ui/loader";
import { useAuthCtx } from "@/app/ctx/auth";
import { NeoOverview } from "./overview/n-overview";
// import { useNav } from "./hooks/useNav";

export const Dashboard = () => {
  const { claims, loading, registered } = useAuthCtx();

  const OverviewOptions = useCallback(() => {
    const is_manager = claims?.some((el) => el === "manager" || el === "admin");
    const options = opts(<ManagerOverview />, <AgentOverview />);
    return <>{options.get(!!is_manager)}</>;
  }, [claims]);

  const RegisteredOptions = useCallback(() => {
    const is_registered = !loading && registered;
    const options = opts(<OverviewOptions />, <NeoOverview />);
    return <>{options.get(is_registered)}</>;
  }, [OverviewOptions, loading, registered]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <RegisteredOptions />
    </main>
  );
};

// export const Dashboard = memo(DashboardContent);
