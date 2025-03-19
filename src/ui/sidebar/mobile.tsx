import { AnimatePresence, motion } from "framer-motion";
import { type ComponentProps, use } from "react";
import { SidebarCtx } from "./ctx";
import { cn } from "@/lib/utils";
import { FireIcon, UserIcon } from "@heroicons/react/24/solid";

export const MobileSidebar = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  const { open, toggle } = use(SidebarCtx)!;
  return (
    <>
      <div
        className={cn(
          "flex h-10 w-full flex-row items-center justify-between px-4 py-4",
        )}
        {...props}
      >
        <div className="z-20 flex w-full justify-end">
          <FireIcon className="size-4 text-background/70 dark:text-foreground/70" />
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
