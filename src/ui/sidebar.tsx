"use client";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import { useState, createContext, useContext, useCallback } from "react";
import type { ComponentProps, PropsWithChildren } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AcademicCapIcon, UserIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { type DualIcon } from "@/app/types";
import { Button, Image } from "@nextui-org/react";
import { toggleState } from "@/utils/helpers";
import { Logo } from "@/app/dashboard/components";
import { useAuthCtx } from "@/app/ctx/auth";
import { useNav } from "@/app/dashboard/hooks/useNav";

export interface NavItem {
  id?: string | number;
  label: string;
  href: string;
  icon: {
    type: "icon" | "image";
    content: DualIcon | string;
  };
}

interface SidebarContextValues {
  open: boolean;
  toggle: VoidFunction;
}

const SidebarContext = createContext<SidebarContextValues | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  // const {user, signOut} = useAuthCtx()
  const [open, setOpenState] = useState(false);
  const toggle = useCallback(() => toggleState(setOpenState), []);

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({ children }: PropsWithChildren) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export const SidebarBody = (props: ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  ...props
}: ComponentProps<typeof motion.div>) => {
  const { open, toggle } = useSidebar();
  const LogoComponent = useCallback(() => <Logo />, []);
  return (
    <>
      <motion.button
        onClick={toggle}
        initial={{ x: 56 }}
        animate={{
          x: open ? 293 : 54,
        }}
        transition={{ duration: 0.285, bounceDamping: 1, bounceStiffness: 1 }}
        className={cn(
          "absolute top-0 z-50 my-6 h-[calc(100vh/12)] w-[20px] cursor-w-resize rounded-full bg-primary-50/50 dark:bg-primary-200/80",
          { "cursor-e-resize": !open },
          "transition-colors duration-500 ease-out dark:hover:bg-primary-300/80",
        )}
      />
      <motion.button
        onClick={toggle}
        animate={{
          x: open ? 270 : 30,
        }}
        transition={{ duration: 0.275, bounceDamping: 1, bounceStiffness: 1 }}
        className={cn(
          "group absolute bottom-12 z-50 my-6 h-[calc(100vh/6)] w-[35px] cursor-w-resize rounded-full bg-transparent",
          { "cursor-e-resize": !open },
          "flex justify-end",
        )}
      >
        <div className="h-full w-[8px] rounded-full bg-transparent transition-all duration-500 ease-out translate-x-1 transform-gpu group-hover:bg-primary-50/50 group-hover:-translate-x-0.5 dark:group-hover:bg-primary-200" />
      </motion.button>

      <motion.div
        className={cn(
          "hidden h-full w-[300px] flex-shrink-0 px-4 py-4 md:flex md:flex-col",
          className,
        )}
        initial={{ width: 60 }}
        animate={{
          width: !open ? "60px" : "300px",
        }}
        // onMouseEnter={() => setOpen(true)}
        // onMouseLeave={() => setOpen(false)}
        {...props}
      >
        <>
          <div>
            <LogoComponent />
            <UserNavs />
          </div>
          <UserSection open={open} />
        </>
      </motion.div>
    </>
  );
};

const UserNavs = () => {
  const { claims } = useAuthCtx();
  const { getUserNavs } = useNav();
  const navs: NavItem[] | undefined = getUserNavs(claims);

  const SidebarNavs = useCallback(() => {
    if (!navs) return;
    return (
      <div className="space-y-2">
        {navs.map((nav, idx) => (
          <SidebarNav key={`${nav.id}_${idx}`} {...nav} href={nav.href} />
        ))}
      </div>
    );
  }, [navs]);

  return <SidebarNavs />;
};

const UserSection = (props: { open: boolean }) => {
  const { user, signOut } = useAuthCtx();
  return (
    <section className="flex items-center space-x-4 whitespace-nowrap">
      <SidebarNav
        className="text-xs tracking-wide text-chalk"
        href="/dashboard/account"
        label={user?.email ?? "Profile"}
        icon={{
          type: user?.photoURL ? "image" : "icon",
          content: user?.photoURL ?? UserIcon,
        }}
      />

      <Button
        size="sm"
        variant="faded"
        onPress={signOut}
        className={cn("hidden w-16 border-0 font-inst text-chalk/80", {
          flex: props.open,
        })}
      >
        Sign out
      </Button>
    </section>
  );
};

interface NavProps extends NavItem {
  className?: string;
  props?: LinkProps;
}
export const SidebarNav = (props: NavProps) => {
  const { open } = useSidebar();
  const pathname = usePathname().split("/");
  const sub = pathname[2];

  const renderIcon = useCallback(() => {
    if (props.icon.type === "icon") {
      const IconComponent = props.icon.content;
      return (
        <div
          className={cn(
            "rounded-xl p-1 text-xs",
            // {
            //   "text-white": pathname.length >= 3 && props.href.includes(sub!),
            // },
            props.className,
          )}
        >
          <IconComponent
            className={cn(
              "dark:hover:text-300 transision-all size-[1.5rem] shrink-0 stroke-1 text-primary-300 drop-shadow-md duration-300 ease-out transform-gpu hover:text-primary-200 dark:text-primary-500",
              {
                "stroke-[1.5px] text-secondary dark:text-secondary":
                  pathname.length >= 2 && props.href.includes(sub!),
              },
              {
                "stroke-[1.5px] text-secondary dark:text-secondary":
                  pathname.length <= 2 && `/${pathname[1]}` === props.href,
              },
            )}
          />
        </div>
      );
    } else {
      return (
        // <Link href={"/dashboard/account"}>
        <Image
          alt={props.label}
          src={props.icon.content as string}
          className={cn("size-7 flex-shrink-0 rounded-full", {
            "filter-primary": pathname.length >= 3 && props.href.includes(sub!),
          })}
        />
        // </Link>
      );
    }
  }, [props, sub, pathname]);

  return (
    <Link
      href={props.href}
      className={cn(
        "group/sidebar flex items-center justify-start gap-3 py-2 hover:text-chalk",
        props.className,
      )}
      {...props.props}
    >
      {renderIcon()}

      <motion.span
        animate={{
          display: open ? "inline-block" : "none",
          opacity: open ? 1 : 0,
        }}
        className={cn(
          "!m-0 inline-block whitespace-pre rounded-lg px-3 py-1 font-inst font-medium tracking-tight text-primary-300 transition-all duration-300 transform-gpu group-hover/sidebar:bg-primary-50/20 group-hover/sidebar:text-primary-100 group-hover/sidebar:translate-x-0.5 dark:text-primary-600 dark:group-hover/sidebar:bg-primary-900/20 dark:group-hover/sidebar:text-primary-900",
          {
            "font-medium text-secondary dark:text-secondary-800":
              pathname.length >= 2 && props.href.includes(sub!),
          },
          {
            "font-medium text-secondary dark:text-secondary-800":
              pathname.length <= 2 && `/${pathname[1]}` === props.href,
          },
        )}
      >
        {props.label}
      </motion.span>
    </Link>
  );
};

///////

export const MobileSidebar = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  const { open, toggle } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between px-4 py-4 md:hidden",
        )}
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <AcademicCapIcon
            className="size-4 text-background/70 dark:text-foreground/70"
            onClick={toggle}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed inset-0 z-[100] flex h-full w-full flex-col justify-between bg-white p-10 dark:bg-foreground",
                className,
              )}
            >
              <div
                className="absolute right-10 top-10 z-50 text-background dark:text-foreground"
                onClick={toggle}
              >
                <UserIcon />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
