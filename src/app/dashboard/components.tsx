import { Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type PropsWithChildren } from "react";
import { LogoLight } from "@/ui/logo";

export const BrandLogo = () => {
  return (
    <div className="flex w-fit space-x-4 whitespace-nowrap">
      <Link
        href="/"
        className="relative z-20 flex h-fit flex-shrink-0 items-center space-x-2 py-1"
      >
        <LogoLight />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "flex whitespace-nowrap px-4 font-jet text-sm tracking-wide text-primary-300 drop-shadow-sm dark:text-void",
          )}
        >
          FastInsure Tech
        </motion.span>
      </Link>
    </div>
  );
};

export const Container = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "flex h-screen w-full flex-1 flex-col overflow-hidden md:flex-row",
    )}
  >
    {children}
  </div>
);
