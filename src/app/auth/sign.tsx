import { cn } from "@/lib/utils";
import { Atomic } from "@/ui/atomic";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { memo, useCallback, useEffect, useMemo } from "react";
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
  const { pending, checkSession, checkLastLogin, checkServer, lastLogin } =
    useAuthFn();

  const onLoad = useCallback(() => {
    console.log("is_open", open);
    if (!open) {
      checkSession();
      checkLastLogin();
      checkServer();
    }
  }, [open, checkSession, checkLastLogin, checkServer]);

  const { add, remove } = keyListener("j", onLoad);

  useEffect(() => {
    add();
    return () => remove();
  }, [add, remove]);

  //////////
  // MOTION

  const state = useMotionValue(0);
  const r = useTransform(state, [0, 1], [384, 16]);
  const h = useTransform(state, [0, 1], [384, 540]);

  const constraints = useMemo(() => {
    if (typeof window !== "undefined") {
      return {
        left: -window.innerWidth / 2 + (window.innerWidth < 600 ? 215 : 250),
        top: -window?.innerHeight / 2 + 300,
        right: window.innerWidth / 2 - (window.innerWidth < 600 ? 215 : 250),
        bottom: window?.innerHeight / 2 - 300,
      };
    }
  }, []);

  //////////
  // WINDOW

  const toggleStateValue = useCallback(() => {
    state.set(pending ? 1 : 0);
  }, [pending, state]);

  useEffect(() => {
    toggleStateValue();
  }, [toggleStateValue]);

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
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-[250] flex h-screen w-screen items-center justify-center p-4",
            "bg-zinc-950 bg-opacity-20 p-4",
          )}
        >
          <motion.div
            drag={window.innerWidth >= 600}
            dragMomentum={false}
            dragConstraints={constraints}
            initial={{
              scale: 0.8,
              opacity: 0,
              borderRadius: r.get(),
              height: h.get(),
            }}
            animate={{
              scale: 1,
              opacity: 1,
              borderRadius: r.get(),
              height: h.get(),
            }}
            exit={{
              scale: 0.6,
              opacity: 0.2,
              y: 50,
              borderRadius: 400,
              height: 100,
            }}
            transition={{}}
            className={cn(
              "h-full w-fit overflow-hidden shadow-xl",
              "rounded-2xl",
              { "shadow-xl": props.shadow === "xl" },
              { "shadow-lg": props.shadow === "lg" },
              { "shadow-md": props.shadow === "md" },
              { "shadow-sm": props.shadow === "sm" },
              "dark:border-fade-dark/90 dark:bg-chalk",
              "border-[0.33px] border-fade-dark/40 bg-white",
              { "bg-transparent dark:bg-transparent": pending },
            )}
            onClick={stopPropagation}
          >
            <SignCardOptions />
          </motion.div>
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
      initial={{ opacity: 0.85, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.8, scale: 0.75 }}
      transition={{}}
      className="h-[540px] w-fit bg-adam/60 dark:bg-adam/80"
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
