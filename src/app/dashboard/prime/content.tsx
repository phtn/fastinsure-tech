"use client";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { Loader } from "@/ui/loader";
import { Err } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const Content = () => {
  const { signOut } = useAuthCtx();
  const router = useRouter();
  const goHome = useCallback(async () => {
    await signOut();
    router.push("/");
  }, [router, signOut]);
  useEffect(() => {
    goHome().catch(Err);
  }, [signOut, goHome]);
  return (
    <div className="p-6">
      <p className="font-inst font-medium tracking-tight text-void dark:text-warning-300">
        Signing out . . .
      </p>
      <Loader />
    </div>
  );
};
