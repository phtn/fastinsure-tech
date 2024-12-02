import { HyperText } from "@/ui/hypertext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlagProps {
  metric: boolean;
  label: (string | undefined)[];
}
export const Flag = ({ metric, label }: FlagProps) => {
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 4, opacity: 1 }}
      transition={{ duration: 0.5, delay: 3 }}
      className={cn(
        "h-5 border-y-[0.33px] border-e-[0.33px] border-primary/60 bg-warning",
        { "bg-secondary": metric },
      )}
    >
      <div className="flex h-5 items-center px-3.5 font-jet text-xs font-light tracking-wider">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 5 }}
          style={{ width: 150 }}
          className="flex uppercase"
        >
          {label[0]}
        </motion.div>
        <motion.div
          initial={{ visibility: "hidden" }}
          animate={{ visibility: "inherit" }}
          transition={{ delay: 5.5 }}
          className="w-fit font-bold"
        >
          <HyperText duration={1500} text={metric ? label[1]! : label[2]!} />
        </motion.div>
      </div>
    </motion.div>
  );
};
