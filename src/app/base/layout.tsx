"use client";

import { type ReactElement } from "react";
import { useAuthState } from "@/lib/auth/useAuthState";
import { auth } from "@/lib/db";

interface BaseLayoutProps {
  authd: ReactElement;
  guest: ReactElement;
}

export default function BaseLayout({ authd, guest }: BaseLayoutProps) {
  const { user } = useAuthState(auth);
  return <div>{user?.uid ? authd : guest}</div>;
}
