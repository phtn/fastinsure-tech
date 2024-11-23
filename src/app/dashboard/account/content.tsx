"use client";

import { Button, Image } from "@nextui-org/react";
import { AccountSummary, TabComponent } from "./components";
import { useAuthCtx } from "@/app/ctx/auth";
import { cn } from "@/lib/utils";

export const AccountContent = () => {
  const { user, signOut } = useAuthCtx();

  return (
    <main className="h-screen overflow-y-scroll bg-background pb-56">
      <section id="top-section" className="relative h-72 w-full">
        <div
          id="cover-photo"
          className={cn(
            "h-56 w-full",
            "overflow-hidden rounded-tl-xl",
            "bg-gradient-to-l from-stone-100/30 via-slate-400/40 to-slate-600/50",
            "dark:from-gray-200/20 dark:via-gray-200/50 dark:to-gray-200",
          )}
        ></div>
        <div
          id="cover-bottom-padding"
          className="flex h-16 w-full items-center justify-end bg-background px-4"
        >
          <div className="flex h-10 w-fit items-center justify-end space-x-4">
            <Button
              size="md"
              radius="sm"
              variant="solid"
              color="primary"
              className="px-4 font-medium"
            >
              Edit Profile
            </Button>
            <Button
              size="md"
              radius="sm"
              variant="flat"
              color="default"
              className="group w-fit"
              onPress={signOut}
            >
              <p className="font-inter text-xs font-medium tracking-tighter">
                Sign out
              </p>
            </Button>
          </div>
        </div>
        <div
          id="user-pfp"
          className="absolute bottom-0 mx-10 size-32 rounded-full bg-background p-1"
        >
          <div className="flex size-full items-center justify-center overflow-clip rounded-full bg-primary-400">
            <Image
              alt="user-pfp"
              src={user?.photoURL ?? undefined}
              width={124}
              height={124}
            />
          </div>
        </div>
      </section>
      <AccountSummary
        name={user?.displayName ?? user?.email ?? ""}
        verified={false}
        group_code={"group"}
      />
      <div className="w-full pb-24">
        <div className="h-96 w-full border-void/20">
          <TabComponent />
        </div>
      </div>
    </main>
  );
};
