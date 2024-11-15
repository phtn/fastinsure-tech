"use client";
import { Dashboard } from "./dashboard";
import { Overview } from "./overview";
import { useCallback } from "react";
import { opts } from "@/utils/helpers";
import { ManagerOverview } from "./m-overview";
import { Loader } from "@/ui/loader";
import { useAuthCtx } from "@/app/ctx/auth";

export const AuthedContent = () => {
  const { claims, loading } = useAuthCtx();

  const OverviewOptions = useCallback(() => {
    const is_manager = claims?.some((el) => el === "manager" || el === "admin");
    const options = opts(<ManagerOverview />, <Overview />);
    return <>{options.get(!!is_manager)}</>;
  }, [claims]);

  return <Dashboard>{loading ? <Loader /> : <OverviewOptions />}</Dashboard>;
};
