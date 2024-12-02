import { cn } from "@/lib/utils";
import { Atomic } from "@/ui/atomic";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import type { Dispatch, SetStateAction } from "react";
import { memo, useCallback, useEffect } from "react";
import { useAuthFn } from "./useAuthFn";
import { onInfo } from "../ctx/toasts";
import { opts } from "@/utils/helpers";
import { UserIcon } from "@heroicons/react/24/solid";
import { EmailSigninForm } from "./form";
import { useWindow } from "@/ui/window/useWindow";
import { Toolbar } from "@/ui/window/toolbar";

export interface AuthComponentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function AuthComponent(props: AuthComponentProps) {
  const { open, close, keyListener, onKeyDown, stopPropagation } = useWindow({
    open: props.open,
    setOpen: props.setOpen,
  });
  const { pending, checkSession, checkServer } = useAuthFn();

  const onLoad = useCallback(() => {
    if (!open) {
      checkServer();
      checkSession();
    }
  }, [open, checkServer, checkSession]);

  const { add, remove } = keyListener(onKeyDown("j", onLoad));

  useEffect(() => {
    if (open) {
      onInfo(pending ? "pending" : "complete");
    }
  }, [pending, open]);

  useEffect(() => {
    add();
    return () => remove();
  }, [add, remove]);

  //////////
  //MOTION

  const state = useMotionValue(0);
  const r = useTransform(state, [0, 1], [384, 10]);
  const h = useTransform(state, [0, 1], [384, 540]);

  const toggleStateValue = useCallback(() => {
    if (open) {
      state.set(pending ? 1 : 0);
    }
  }, [open, pending, state]);

  useEffect(() => {
    toggleStateValue();
  }, [toggleStateValue]);

  /////////

  const SignCardOptions = useCallback(() => {
    const options = opts(<PendingState />, <SignCard close={close} />);
    return <>{options.get(pending)}</>;
  }, [pending, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-[2px]",
          )}
          onClick={close}
        >
          <motion.div
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
            exit={{ scale: 0.75, opacity: 0, y: 25 }}
            transition={{}}
            className={cn(
              "h-[540px] w-fit overflow-hidden shadow-2xl",
              "border-[0.33px] border-fade/80 dark:border-fade-dark/80",
              "bg-white dark:bg-transparent",
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
}

const SignCard = ({ close }: SignCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0.85, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.8, scale: 0.75 }}
      transition={{}}
      className="h-[540px] w-[30vw] bg-chalk"
    >
      <Toolbar icon={UserIcon} title="Sign in" closeFn={close} />
      <EmailSigninForm />
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
