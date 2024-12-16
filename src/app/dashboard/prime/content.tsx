"use client";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { Loader } from "@/ui/loader";
import { Err } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Content = () => {
  const { signOut } = useAuthCtx();
  const router = useRouter();
  useEffect(() => {
    signOut()
      .then(() => router.push("/"))
      .catch(Err);
  }, [signOut, router]);
  return <Loader />;
};

export const PrimeContent = Content;
