"use client";
import { useAuthCtx } from "@/app/ctx/auth";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarNav } from "@/ui/sidebar";
import { UserIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { type PropsWithChildren, useState } from "react";
import { Logo } from "./components";
import { useNav } from "./hooks/useNav";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { user, signOut } = useAuthCtx();
  const [open, setOpen] = useState(false);
  const { navs } = useNav();

  return (
    <div
      className={cn(
        "bg-[url('/svg/mesh.svg')] bg-cover dark:bg-background/50",
        "flex h-screen w-full flex-1 flex-col overflow-hidden md:flex-row",
        { "bg-right": open },
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-foreground backdrop-blur-3xl dark:bg-background/90">
          <div className="flex w-fit flex-1 flex-col overflow-y-auto overflow-x-scroll">
            <div className="flex w-fit space-x-4 whitespace-nowrap">
              <Logo open={open} />
            </div>
            <div className="mt-6 flex flex-col gap-2">
              {navs.map((nav, idx) => (
                <SidebarNav key={idx} {...nav} />
              ))}
            </div>
          </div>
          <section className="flex items-center space-x-4 whitespace-nowrap">
            <SidebarNav
              className="text-xs"
              label={user?.email ?? "user"}
              href="#"
              icon={{
                type: user?.photoURL ? "image" : "icon",
                content: user?.photoURL ?? UserIcon,
              }}
            />
            <Button
              size="sm"
              variant="faded"
              color="warning"
              onPress={signOut}
              className={cn(
                "hidden w-16 border-0 font-inter font-medium tracking-tight",
                { flex: open },
              )}
            >
              Sign out
            </Button>
          </section>
        </SidebarBody>
      </Sidebar>
      <div
        className={cn(
          "relative z-[100] flex flex-1 bg-foreground drop-shadow-lg dark:bg-background/90",
          {},
        )}
      >
        <div className="_dark:bg-background relative flex h-full w-full flex-1 flex-col gap-2 rounded-tl-3xl border-l-[0.33px] border-foreground/15 bg-background p-2 md:p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
// const LogoIcon = () => {
//   return (
//     <Link
//       href="#"
//       className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-foreground"
//     >
//       <div className="h-5 w-6 flex-shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-background dark:bg-foreground" />
//     </Link>
//   );
// };
