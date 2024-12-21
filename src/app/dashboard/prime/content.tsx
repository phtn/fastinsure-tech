"use client";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { onAwait } from "@/app/ctx/toasts";
import { Loader } from "@/ui/loader";
import { Err } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const Content = () => {
  const { signOut } = useAuthCtx();
  const router = useRouter();
  const goHome = useCallback(() => {
    router.push("/");
  }, [router]);
  useEffect(() => {
    onAwait(signOut, "Signing out...", "Signed out.").then(goHome).catch(Err);
  }, [signOut, goHome]);
  return <Loader />;
};
