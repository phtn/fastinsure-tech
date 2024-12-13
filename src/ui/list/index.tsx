import { type ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { type FC, useCallback } from "react";

interface HyperListProps<T> {
  data: T[] | undefined;
  component: FC<T>;
  container?: ClassName;
  itemStyle?: ClassName;
}
export const HyperList = <
  T extends { id?: number | string; uid?: string | null },
>(
  props: HyperListProps<T>,
) => {
  const render = useCallback(
    (i: T, j: number) => (
      <motion.li
        key={i.id ?? i.uid}
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
    ),
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
