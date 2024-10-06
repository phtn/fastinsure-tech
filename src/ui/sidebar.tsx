"use client";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import React, { useState, createContext, useContext, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AcademicCapIcon, UserIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { type DualIcon } from "@/app/types";
import Image from "next/image";

export interface Links {
  label: string;
  href: string;
  icon: {
    type: "icon" | "image";
    content: DualIcon | string;
  };
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "hidden h-full w-[300px] flex-shrink-0 px-4 py-4 md:flex md:flex-col",
          className,
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between bg-foreground/0 px-4 py-4 dark:bg-foreground/70 md:hidden",
        )}
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <AcademicCapIcon
            className="size-4 text-background/70 dark:text-foreground/70"
            onClick={() => setOpen(!open)}
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
                onClick={() => setOpen(!open)}
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

interface SidebarLinkProps {
  link: Links;
  className?: string;
  props?: LinkProps;
}
export const SidebarLink = (props: SidebarLinkProps) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname().split("/");
  const sub = pathname[2];

  const renderIcon = useCallback(() => {
    if (props.link.icon.type === "icon") {
      // This is a DualIcon component
      const IconComponent = props.link.icon.content;
      return (
        // bg-orange-500/10
        <div
          className={cn(
            "rounded-xl p-1 text-foreground",
            {
              "bg-warning text-white":
                pathname.length >= 3 && props.link.href.includes(sub!),
            },
            props.className,
          )}
        >
          <IconComponent
            className={cn("size-5 flex-shrink-0 stroke-1 drop-shadow-md", {
              "stroke-[1.5px]":
                pathname.length >= 3 && props.link.href.includes(sub!),
            })}
          />
        </div>
      );
    } else {
      return (
        <Image
          src={props.link.icon.content as string}
          alt={props.link.label}
          width={28}
          height={28}
          className={cn("size-7 flex-shrink-0 rounded-full", {
            "filter-primary":
              pathname.length >= 3 && props.link.href.includes(sub!),
          })}
        />
      );
    }
  }, [
    props.link.icon,
    props.link.href,
    props.link.label,
    props.className,
    sub,
    pathname.length,
  ]);

  return (
    <Link
      href={props.link.href}
      className={cn(
        "group/sidebar flex items-center justify-start gap-3 py-2 text-foreground",
        props.className,
      )}
      {...props.props}
    >
      {renderIcon()}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "!m-0 inline-block whitespace-pre rounded-lg px-3 py-1 font-inst text-sm font-medium tracking-tight text-foreground transition duration-200 group-hover/sidebar:translate-x-0.5 group-hover/sidebar:bg-foreground group-hover/sidebar:text-background dark:text-background",
          {
            "font-medium text-warning":
              pathname.length >= 3 && props.link.href.includes(sub!),
          },
          {
            "font-medium text-warning":
              pathname.length <= 2 && props.link.href.includes(pathname[1]!),
          },
        )}
      >
        {props.link.label}
      </motion.span>
    </Link>
  );
};
