"use client";

import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@nextui-org/react";
import { type TestFunction, useFunction } from "./useFunction";
import { cn } from "@/lib/utils";
import Json from "@/ui/json";
import { toggleState } from "@/utils/helpers";
import { DevToolbar } from "./toolbar";
import { HyperList } from "@/ui/list";
import { useWindow } from "@/ui/window/useWindow";
import { DialogWindow } from "@/ui/window";

export function DevButton(props: { fn: VoidFunction }) {
  return (
    <Button
      variant="shadow"
      isIconOnly
      onPress={props.fn}
      className="_text-[#fae4c2] group flex size-6 items-center justify-center rounded-lg bg-transparent text-emerald-400 transition-colors duration-300 ease-out hover:bg-foreground dark:hover:bg-background"
    >
      <CommandLineIcon className="size-6 stroke-2 group-hover:dark:fill-foreground" />
    </Button>
  );
}

interface ResultProps {
  result: string | number | boolean | object | null | undefined;
}
const ResultComponent = ({ result }: ResultProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const src = useMemo(
    () =>
      typeof result == "object"
        ? { ...result }
        : { data: result, type: typeof result },
    [result],
  );
  const toggleCollapse = useCallback(
    () => toggleState(setCollapsed),
    [setCollapsed],
  );
  if (!result) return null;
  return (
    <div className="relative space-y-1.5 font-jet text-xs">
      <p className="p-1 font-medium text-indigo-200/80">Results</p>
      {collapsed ? null : <Json src={src} theme="brewer" />}

      <div
        className={cn(
          "absolute hidden",
          "-top-2 right-0",
          { flex: !!result },
          { "-top-2 right-0": collapsed },
        )}
      >
        <Button
          isIconOnly
          size="sm"
          radius="none"
          variant="flat"
          color="primary"
          onPress={toggleCollapse}
          className="bg-transparent text-indigo-200 dark:text-indigo-200/80"
        >
          {collapsed ? (
            <BarsArrowDownIcon className="size-5" />
          ) : (
            <BarsArrowUpIcon className="size-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

const Result = memo(ResultComponent);

const FunctionListItem = (props: TestFunction) => {
  return (
    <>
      <button onClick={props.fn} className="flex items-center space-x-4">
        <div className="flex size-10 flex-shrink-0 items-start justify-center rounded-full text-primary dark:text-primary">
          <props.icon className="size-6 stroke-1 text-icon transition-all duration-300 ease-out group-hover:scale-110 dark:text-icon-dark/80" />
        </div>
        <div className="flex-grow space-y-1 py-1 text-left">
          <h3 className="font-inter text-sm font-semibold tracking-tighter text-icon dark:text-icon-dark">
            {props.name}
          </h3>
          <section className="flex items-center space-x-4 whitespace-nowrap font-mono text-xs text-primary-700 opacity-80">
            <span className="font-medium tracking-tight text-void dark:text-icon-dark/80">
              𝒇(𝒙) ⟹
            </span>
            <span className="text-xs font-medium text-indigo-600 dark:text-figma-light">
              {props?.returnType}
            </span>
            <span>{props.description}</span>
          </section>
        </div>
      </button>
      <div
        className={cn(
          "h-px overflow-hidden rounded-md border border-chalk",
          "transition-transform duration-200 ease-out transform-gpu",
          "hidden w-full bg-void p-2 dark:border-zinc-950 dark:bg-[#0c0d0e]",
          { "block h-fit": !!props.result },
        )}
      >
        <Result result={props?.result} />
      </div>
    </>
  );
};

interface DevCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactNode;
}

export function DevCommands(props: DevCommandProps) {
  const { close, filterFn, searchFn, keyListener, onKeyDown } = useWindow({
    open: props.open,
    setOpen: props.setOpen,
  });

  const { devFnList, updateFnList, pending } = useFunction();
  const filtered: TestFunction[] = useMemo(
    () => filterFn(devFnList),
    [devFnList, filterFn],
  );

  const { add, remove } = keyListener(onKeyDown("k"));

  useEffect(() => {
    add();
    return () => remove();
  }, [add, remove]);

  const Toolbar = useCallback(
    () => (
      <DevToolbar
        loading={pending}
        searchFn={searchFn}
        len={filtered.length}
        closeFn={close}
        action={updateFnList}
      />
    ),
    [close, filtered.length, pending, searchFn, updateFnList],
  );

  return (
    // <AnimatePresence>
    //   {open && (
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{ opacity: 0 }}
    //       className={cn(
    //         "fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-50 p-4",
    //       )}
    //       onClick={close}
    //     >
    //       <motion.div
    //         initial={{ scale: 0.95, opacity: 0 }}
    //         animate={{ scale: 1, opacity: 1 }}
    //         exit={{ scale: 0.95, opacity: 0 }}
    //         className={cn(
    //           "w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl",
    //           "border-[0.33px] border-fade-dark dark:border-fade-dark/90",
    //           "bg-white dark:bg-[#0b0b0e]",
    //         )}
    //         onClick={stopPropagation}
    //       >
    <DialogWindow
      k="k"
      open={props.open}
      setOpen={props.setOpen}
      toolbar={Toolbar}
    >
      <HyperList
        data={filtered}
        component={FunctionListItem}
        container={cn("h-[calc(60vh)] overflow-y-scroll")}
        itemStyle={cn(
          "space-y-2 p-4 border-b-[0.33px]",
          " border-icon/80 last:border-0 dark:border-void",
          "h-fit w-full cursor-pointer overflow-clip",
        )}
      />
      {/* </motion.div> */}
      {/* </motion.div> */}
    </DialogWindow>
    // )}
    // </AnimatePresence>
  );
}
