import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { FC, ReactNode } from "react";
import { useEffect } from "react";
// import { keyListener, type Keys, onKeyDown, stopPropagation } from "./utils";
import { Toolbar, type ToolbarProps } from "./toolbar";
import { type UseWindow, useWindow, type Keys } from "./useWindow";

export type WindowVariant = "demigod" | "god" | "goddess";
interface DialogWindowProps extends UseWindow {
  k: Keys;
  children?: ReactNode;
  action?: <T, R>(p: T) => R;
  variant?: WindowVariant;
  shadow?: "sm" | "md" | "lg" | "xl";
  toolbar?: FC<ToolbarProps>;
  title?: string;
}

export function DialogWindow(props: DialogWindowProps) {
  const { action, children, k, shadow = "xl", title, variant, setOpen } = props;

  const { open, close, keyListener, onKeyDown, stopPropagation } = useWindow({
    open: props.open,
    setOpen,
  });

  const { add, remove } = keyListener(onKeyDown(k, action));

  useEffect(() => {
    add();
    return () => remove();
  }, [add, remove]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-10 p-4",
          )}
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, borderRadius: 112 }}
            animate={{ scale: 1, opacity: 1, borderRadius: 12 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            className={cn(
              "w-full max-w-2xl overflow-hidden shadow-xl",
              "rounded-xl",
              { "shadow-xl": shadow === "xl" },
              { "shadow-lg": shadow === "lg" },
              { "shadow-md": shadow === "md" },
              { "shadow-sm": shadow === "sm" },
              "dark:border-fade-dark/90 dark:bg-[#0b0b0e]",
              "border-[0.33px] border-fade-dark/40 bg-white",
            )}
            onClick={stopPropagation}
          >
            {props.toolbar ? (
              <props.toolbar title={title} closeFn={close} variant={variant} />
            ) : (
              <Toolbar title={title} closeFn={close} variant={variant} />
            )}

            <div
              className={cn(
                "relative border-x border-b-[0.33px] border-t-0",
                "rounded-b-[11.77px]",
                "border-dock-border/40",
                "dark:border-icon/40",
              )}
            >
              <div className="absolute top-0 h-[0.5px] w-full bg-shadow/90 dark:bg-icon/40" />

              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
