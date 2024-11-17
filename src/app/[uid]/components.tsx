import { Image, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Logo = (props: { open: boolean }) => {
  return (
    <Link
      href="/"
      className="relative z-20 flex h-fit flex-shrink-0 items-center space-x-2 py-1"
    >
      <Image
        alt="admin-logo"
        src={"/svg/f.svg"}
        className="aspect-square flex-shrink-0 bg-foreground/20 px-0.5"
        width={28}
        height={28}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "whitespace-nowrap px-4 font-jet text-xs tracking-widest text-primary-600",
          { hidden: !props.open },
        )}
      >
        FastInsure Tech
      </motion.span>
    </Link>
  );
};
