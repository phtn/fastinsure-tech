"use client";

import { AgentOverview } from "./overview/a-overview";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { ManagerOverview } from "./overview/m-overview";
import { Loader } from "@/ui/loader";
import { useAuthCtx } from "@/app/ctx/auth";
import { NeoOverview } from "./overview/n-overview";

export const DashboardContent = () => {
  const { claims, loading, user, registered } = useAuthCtx();

  const OverviewOptions = useCallback(() => {
    const is_manager = claims?.some((el) => el === "manager" || el === "admin");
    const options = opts(<ManagerOverview user={user} />, <AgentOverview />);
    return <>{options.get(!!is_manager)}</>;
  }, [claims, user]);

  const RegisteredOptions = useCallback(() => {
    const is_registered = !loading && registered;
    const options = opts(<OverviewOptions />, <NeoOverview user={user} />);
    return <>{options.get(is_registered)}</>;
  }, [OverviewOptions, loading, registered, user]);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !registered) {
    return <NeoOverview user={user} />;
  }

  return (
    <main>
      <RegisteredOptions />
    </main>
  );
};
