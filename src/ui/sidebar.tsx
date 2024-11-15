"use client";
import { cn } from "@/lib/utils";
import Link, { type LinkProps } from "next/link";
import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
} from "react";
import type {
  ComponentProps,
  Dispatch,
  ReactNode,
  SetStateAction,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AcademicCapIcon, UserIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { type DualIcon } from "@/app/types";
import { Image } from "@nextui-org/react";
import {
  getSidebarAnimate,
  setSidebarAnimate,
  type SidebarAnimate,
} from "@/app/actions";

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
  setOpen: Dispatch<SetStateAction<boolean>>;
  animate: SidebarAnimate;
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

interface SidebarProviderValues {
  children: ReactNode;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  animate?: SidebarAnimate;
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
}: SidebarProviderValues) => {
  const [openState, setOpenState] = useState(false);
  const [animate, setAnimate] = useState<SidebarAnimate>("auto");

  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  const sidebarState = useCallback(async () => {
    const animateState = (await getSidebarAnimate()) as SidebarAnimate;
    if (!animateState) await setSidebarAnimate("auto");
    setAnimate(animateState);
  }, []);

  useEffect(() => {
    sidebarState().catch(console.error);
  }, [sidebarState]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: SidebarProviderValues) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
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
  children,
  ...props
}: ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "hidden h-full w-[300px] flex-shrink-0 px-4 py-4 md:flex md:flex-col",
          className,
        )}
        animate={{
          width: animate === "auto" ? (open ? "300px" : "60px") : "300px",
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
}: ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
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
      const IconComponent = props.link.icon.content;
      return (
        <div
          className={cn(
            "rounded-xl p-1",
            {
              "bg-warning text-white":
                pathname.length >= 3 && props.link.href.includes(sub!),
            },
            props.className,
          )}
        >
          <IconComponent
            className={cn(
              "size-[1.5rem] shrink-0 stroke-1 text-primary-300 drop-shadow-md dark:text-primary-500",
              {
                "stroke-[1.5px] text-secondary dark:text-secondary-300":
                  pathname.length >= 2 && props.link.href.includes(sub!),
              },
              {
                "stroke-[1.5px] text-secondary dark:text-secondary-300":
                  pathname.length <= 2 && `/${pathname[1]}` === props.link.href,
              },
            )}
          />
        </div>
      );
    } else {
      return (
        <Image
          src={props.link.icon.content as string}
          alt={props.link.label}
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
    pathname,
  ]);

  return (
    <Link
      href={props.link.href}
      className={cn(
        "group/sidebar flex items-center justify-start gap-3 py-2",
        props.className,
      )}
      {...props.props}
    >
      {renderIcon()}

      <motion.span
        animate={{
          display:
            animate === "auto"
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
          opacity: animate === "auto" ? (open ? 1 : 0) : 1,
        }}
        className={cn(
          "!m-0 inline-block whitespace-pre rounded-lg px-3 py-1 font-inst font-medium tracking-tight text-primary-300 transition-all duration-300 transform-gpu group-hover/sidebar:bg-primary-50/20 group-hover/sidebar:text-primary-100 group-hover/sidebar:translate-x-0.5 dark:text-primary-600 dark:group-hover/sidebar:bg-primary-900/20 dark:group-hover/sidebar:text-primary-900",
          {
            "font-medium text-secondary dark:text-secondary-800":
              pathname.length >= 2 && props.link.href.includes(sub!),
          },
          {
            "font-medium text-secondary dark:text-secondary-800":
              pathname.length <= 2 && `/${pathname[1]}` === props.link.href,
          },
        )}
      >
        {props.link.label}
      </motion.span>
    </Link>
  );
};
