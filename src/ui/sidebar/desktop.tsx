import { cn } from "@nextui-org/react";
import { motion } from "framer-motion";
import { type ComponentProps, use } from "react";
import { UserSection } from "./user-section";
import { SidebarCtx } from "./ctx";
import { NavItems } from "./nav-items";
import { BrandLogo } from "@/app/dashboard/components";

export const DesktopSidebar = ({
  className,
  ...props
}: ComponentProps<typeof motion.div>) => {
  const { open, toggle } = use(SidebarCtx)!;
  return (
    <div className="h-screen bg-gradient-to-t from-void/60 via-void/20 to-transparent">
      <motion.button
        id="sidebar-switch-a"
        onClick={toggle}
        initial={{ x: 56 }}
        animate={{
          x: open ? 293 : 54,
        }}
        transition={{ duration: 0.285, bounceDamping: 1, bounceStiffness: 1 }}
        className={cn(
          "absolute top-0 z-50 my-6 h-[calc(100vh/12)] w-[20px] cursor-w-resize rounded-full bg-primary-50/50",
          { "cursor-e-resize": !open },
          "transition-colors duration-1000 ease-in-out hover:bg-orange-200",
          "border-b-[0.33px] border-l-[0.33px] border-slate-400/40",
          "shadow-2xl shadow-void dark:border-slate-700/70 dark:bg-zinc-600/80",
        )}
      />
      <motion.button
        id="sidebar-switch-b"
        onClick={toggle}
        animate={{
          x: open ? 277 : 37,
        }}
        transition={{ duration: 0.275, bounceDamping: 1, bounceStiffness: 1 }}
        className={cn(
          "group absolute bottom-12 z-50 my-6 h-[calc(100vh/6)] w-[35px] cursor-w-resize rounded-full bg-transparent",
          { "cursor-e-resize": !open },
          "flex justify-end",
        )}
      >

        {/* "", */}

        <div className={cn("h-full w-[17px] rounded-full",
          "transition-all translate-x-6 transform-gpu",
          "duration-1000 ease-in-out group-hover:bg-orange-200",
          "group-hover:shadow-inner group-hover:-translate-x-0",
          "shadow-inner"
        )} />
      </motion.button>

      <motion.div
        className={cn(
          " h-full w-[300px] flex-shrink-0 px-4 py-4 md:flex md:flex-col portrait:hidden",
          className,
        )}
        initial={{ width: 60 }}
        animate={{
          width: !open ? "60px" : "300px",
        }}
        {...props}
      >
        <div className="">
          <div className="flex h-[calc(85vh)] flex-col space-y-4">
            <BrandLogo />
            <NavItems />
          </div>
          <UserSection open={open} />
        </div>
      </motion.div>
    </div>
  );
};
