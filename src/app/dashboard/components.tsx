import { Image, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Logo = () => {
  return (
    <div className="flex w-fit space-x-4 whitespace-nowrap">
      <Link
        href="/"
        className="relative z-20 flex h-fit flex-shrink-0 items-center space-x-2 py-1"
      >
        <Image
          alt="admin-logo"
          src={"/svg/f.svg"}
          className="animate-enter bg-void px-0.5"
          width={28}
          height={28}
        />
        {/* <p className="px-2 font-inter text-xl font-black text-chalk/80">F</p> */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={cn(
            "flex whitespace-nowrap px-4 font-jet text-xs tracking-widest text-primary-300",
          )}
        >
          FastInsure Tech
        </motion.span>
      </Link>
    </div>
  );
};
