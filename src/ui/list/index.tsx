import { type ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { type FC, useCallback } from "react";

interface HyperListProps<T> {
  data: T[] | undefined;
  component: FC<T>;
  container?: ClassName;
  itemStyle?: ClassName;
  keyId?: keyof T;
}
export const HyperList = <T extends object>(props: HyperListProps<T>) => {
  const render = useCallback(
    (i: T, j: number) => {
      const key = String(props?.keyId && props.keyId in i ? i[props.keyId] : j);
      return (
        <motion.li
          key={key}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: j * 0.05 }}
          className={cn(
            "group/list hover:bg-chalk dark:hover:bg-primary-500/5",
            props.itemStyle,
          )}
        >
          <props.component {...i} />
        </motion.li>
      );
    },
    [props],
  );
  return (
    <AnimatePresence>
      <ul className={cn("max-h-60vh overflow-y-auto", props.container)}>
        {props.data?.map(render)}
      </ul>
    </AnimatePresence>
  );
};
