"use client";

import { AgentOverview } from "./overview/a-overview";
import { useCallback } from "react";
import { ManagerOverview } from "./overview/m-overview";
import { Loader } from "@/ui/loader";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { NeoOverview } from "./overview/n-overview";
import { UOverview } from "./overview/u-overview";
import { SuperOverview } from "./overview/s-overview";

const DashboardComponent = () => {
  const { vxuser } = useAuthCtx();

  const OverviewOptions = useCallback((props: { role: string | undefined }) => {
    switch (props.role) {
      case "admin":
        return <SuperOverview />;
      case "manager":
        return <ManagerOverview />;
      case "underwriter":
        return <UOverview />;
      case "agent":
        return <AgentOverview />;
      case "neo":
        return <NeoOverview />;
      default:
        <NeoOverview />;
    }
  }, []);

  return vxuser ? <OverviewOptions role={vxuser?.role} /> : <Loader />;
};

export const Dashboard = DashboardComponent;
