import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { useEffect } from "react";
import {
  StaticToolbar,
  type StaticToolbarProps,
  Toolbar,
  type ToolbarProps,
} from "./toolbar";
import { type UseWindow, useWindow } from "./useWindow";
import type { DualIcon } from "@/app/types";
import { type Keys } from "./utils";

export type WindowVariant = "demigod" | "god" | "goddess" | "adam" | "void";
interface DialogWindowProps<S> extends UseWindow {
  k?: Keys;
  value?: string;
  children?: ReactNode;
  action?: <T, R>(p: T) => R;
  variant?: WindowVariant;
  shadow?: "sm" | "md" | "lg" | "xl";
  toolbar?: FC<ToolbarProps<S>>;
  title?: ReactNode;
}

export const DialogWindow = <T,>(props: DialogWindowProps<T>) => {
  const {
    k,
    action,
    children,
    shadow = "xl",
    title,
    variant,
    value,
    setOpen,
  } = props;

  const { open, close, keyListener, stopPropagation } = useWindow({
    open: props.open,
    setOpen,
  });

  const { add, remove } = keyListener(k, action);

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
            "fixed inset-0 flex items-center justify-center bg-void bg-opacity-10 p-4",
          )}
          // onClick={close}
        >
          <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0.95, opacity: 0, borderRadius: 112 }}
            animate={{ scale: 1, opacity: 1, borderRadius: 16 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            className={cn(
              "z-50 w-full max-w-2xl overflow-hidden shadow-xl",
              "rounded-2xl",
              { "shadow-xl": shadow === "xl" },
              { "shadow-lg": shadow === "lg" },
              { "shadow-md": shadow === "md" },
              { "shadow-sm": shadow === "sm" },
              "dark:border-fade-dark/90 dark:bg-void",
              "border-[0.33px] border-fade-dark/40 bg-white",
            )}
            onClick={stopPropagation}
          >
            {props.toolbar ? (
              <props.toolbar
                value={value}
                title={title}
                closeFn={close}
                variant={variant}
              />
            ) : (
              <Toolbar
                title={title}
                value={value}
                closeFn={close}
                variant={variant}
              />
            )}

            <WindowContent>{children}</WindowContent>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface WindowProps {
  children?: ReactNode;
  variant?: WindowVariant;
  shadow?: "sm" | "md" | "lg" | "xl";
  toolbar?: FC<StaticToolbarProps>;
  title?: ReactNode;
  icon?: DualIcon;
  closeFn?: VoidFunction;
}
export function Window(props: WindowProps) {
  const { children, shadow = "xl", title, variant, closeFn } = props;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "flex w-full items-center justify-center rounded-2xl bg-void",
        )}
      >
        <motion.div
          drag={false}
          dragMomentum={false}
          initial={{ scale: 0.95, opacity: 0, borderRadius: 112 }}
          animate={{ scale: 1, opacity: 1, borderRadius: 16 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className={cn(
            "w-full overflow-hidden shadow-xl",
            "rounded-2xl",
            { "shadow-xl": shadow === "xl" },
            { "shadow-lg": shadow === "lg" },
            { "shadow-md": shadow === "md" },
            { "shadow-sm": shadow === "sm" },
            "dark:border-fade-dark/90 dark:bg-void",
            "border-[0.0px] border-fade-dark/20 bg-chalk",
          )}
        >
          {props.toolbar ? (
            <props.toolbar title={title} variant={variant} />
          ) : (
            <StaticToolbar
              closeFn={closeFn}
              icon={props.icon}
              title={title}
              variant={variant}
            />
          )}

          <WindowContent>{children}</WindowContent>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function FlatWindow(props: WindowProps) {
  const { children, shadow = "xl", title, variant, closeFn } = props;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "flex border-[0.33px] border-primary/60 rounded-2xl w-full items-center justify-center",
        )}
      >
        <motion.div
          initial={{ opacity: 0, borderRadius: 16 }}
          animate={{ opacity: 1, borderRadius: 16 }}
          className={cn(
            "w-full overflow-hidden shadow-xl",
            { "shadow-xl": shadow === "xl" },
            { "shadow-lg": shadow === "lg" },
            { "shadow-md": shadow === "md" },
            { "shadow-sm": shadow === "sm" },
            "border-0 bg-chalk",
          )}
        >
          {props.toolbar ? (
            <props.toolbar title={title} variant={variant} />
          ) : (
            <StaticToolbar
              closeFn={closeFn}
              icon={props.icon}
              title={title}
              variant={variant}
            />
          )}

          <WindowContent>{children}</WindowContent>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export const WindowContent = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "relative overflow-hidden",
      "border-0 border-t-0",
    )}
  >
    <div className="absolute top-0 h-[0.0px] w-full bg-shadow-dark/5 dark:bg-primary-200/80" />
    {children}
  </div>
);
