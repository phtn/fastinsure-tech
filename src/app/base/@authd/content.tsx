"use client";

import { auth } from "@/lib/db";
import { Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";

export const AuthdContent = () => (
  <div className="h-screen w-full bg-gray-300 p-10 text-primary">
    <Button variant="shadow" color="warning" onPress={() => signOut(auth)}>
      Sign out
    </Button>
  </div>
);
