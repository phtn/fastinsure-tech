"use client";

import { AgentOverview } from "./overview/a-overview";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { ManagerOverview } from "./overview/m-overview";
import { Loader } from "@/ui/loader";
import { useAuthCtx } from "@/app/ctx/auth";
import { NeoOverview } from "./overview/n-overview";

const DashboardComponent = () => {
  const { claims, loading } = useAuthCtx();

  const OverviewOptions = useCallback(() => {
    const is_manager = claims?.some((el) => el === "manager" || el === "admin");
    const options = opts(<ManagerOverview />, <AgentOverview />);
    return <>{options.get(!!is_manager)}</>;
  }, [claims]);

  const RegisteredOptions = useCallback(() => {
    const withClaims = claims && claims?.length > 0;
    const options = opts(<OverviewOptions />, <NeoOverview />);
    return <>{options.get(withClaims ?? false)}</>;
  }, [OverviewOptions, claims]);

  // const DevMode = useCallback(() => {
  //   const devenv = env.NODE_ENV === "development";
  //   const devusers = env.NEXT_PUBLIC_DEVS.split(",");
  //   const isDev = !!user?.email && devusers.includes(user.email) && devenv;

  //   const options = opts(<DevOverview />, <RegisteredOptions />);

  //   return <>{options.get(isDev)}</>;
  // }, [RegisteredOptions, user?.email]);

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      <RegisteredOptions />
    </main>
  );
};

export const Dashboard = DashboardComponent;
