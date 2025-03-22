import { cn } from "@/lib/utils";
import { Atomic } from "@/ui/atomic";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { memo, useCallback, useEffect } from "react";
import { useAuthFn } from "./useAuthFn";
import { opts } from "@/utils/helpers";
import { UserIcon } from "@heroicons/react/24/solid";
import { EmailSigninForm } from "./form";
import { useWindow } from "@/ui/window/useWindow";
import { Toolbar } from "@/ui/window/toolbar";
import { WindowContent } from "@/ui/window";

export interface AuthComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  shadow?: "sm" | "md" | "lg" | "xl";
}
function AuthComponent(props: AuthComponentProps) {
  const { open, close, keyListener, stopPropagation } = useWindow({
    open: props.open,
    setOpen: props.setOpen,
  });
  const { pending, checkSession, lastLogin, uid } = useAuthFn();

  const onLoad = useCallback(() => {
    console.log("is_open", open, uid);
    if (!open) {
      checkSession().catch((err) => console.error(err));
    }
  }, [open, checkSession, uid]);

  const { add, remove } = keyListener("j", onLoad);

  useEffect(() => {
    add();
    return () => remove();
  }, [add, remove]);

  const SignCardOptions = useCallback(() => {
    const options = opts(
      <PendingState />,
      <SignCard close={close} lastLogin={lastLogin} />,
    );
    return <>{options.get(pending)}</>;
  }, [pending, close, lastLogin]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{duration: 0.3, ease: "easeInOut"}}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "fixed inset-0 z-[250] flex h-screen w-screen items-center justify-center p-4",
            "bg-zinc-950 bg-opacity-20 p-4 transition-transform will-change-auto",
          )}
        >
          <div
            className={cn(
              "h-fit w-fit overflow-hidden shadow-xl",
              "rounded-2xl",
              { "shadow-xl": props.shadow === "xl" },
              { "shadow-lg": props.shadow === "lg" },
              { "shadow-md": props.shadow === "md" },
              { "shadow-sm": props.shadow === "sm" },
              "dark:border-fade-dark/90 dark:bg-chalk",
              "border-[0.33px] border-fade-dark/40 bg-white",
              { "rounded-full bg-transparent dark:bg-transparent": pending },
            )}
            onClick={stopPropagation}
          >
            <SignCardOptions />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SignCardProps {
  close: VoidFunction;
  lastLogin: string | undefined;
}

const SignCard = ({ close, lastLogin }: SignCardProps) => {
  return (
    <motion.div
      initial={false}
      className="h-[540px] w-fit bg-white dark:bg-adam/80"
    >
      <Toolbar icon={UserIcon} closeFn={close} variant="void" />
      <WindowContent>
        <EmailSigninForm lastLogin={lastLogin} />
      </WindowContent>
    </motion.div>
  );
};

const PendingState = () => (
  <div className={"flex size-96 items-center justify-center text-warning"}>
    <Atomic />
  </div>
);

export const AuthCommand = memo((props: AuthComponentProps) => (
  <AuthComponent {...props} />
));
AuthCommand.displayName = "AuthCommand";
