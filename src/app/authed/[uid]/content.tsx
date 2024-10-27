"use client";
import { useClaims } from "@/lib/hooks/useClaims";
import { Dashboard } from "./dashboard";
import { Overview } from "./overview";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { ManagerOverview } from "./m-overview";
import { Loader } from "@/ui/loader";

export const AuthedContent = () => {
  const { claims, loading } = useClaims();

  const OverviewOptions = useCallback(() => {
    const is_manager = claims.includes("manager") || claims.includes("admin");
    const options = opts(<ManagerOverview />, <Overview />);
    return <>{loading ? <Loader /> : options.get(is_manager)}</>;
  }, [claims, loading]);

  return (
    <Dashboard>
      <OverviewOptions />
    </Dashboard>
  );
};
