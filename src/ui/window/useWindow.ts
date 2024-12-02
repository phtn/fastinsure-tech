import {
  type ChangeEvent,
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  useCallback,
  useState,
} from "react";

export type Keys = "j" | "k";
interface FilterProps {
  id?: number | string;
  name: string;
  description?: string;
}

export interface UseWindow {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const useWindow = ({ open, setOpen }: UseWindow) => {
  const [search, setSearch] = useState("");
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const stopPropagation = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const searchFn = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  }, []);

  const filterFn = useCallback(
    <T extends FilterProps>(list: T[], max?: number) =>
      list
        .filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, max ?? 5),
    [search],
  );

  const onKeyDown = useCallback(
    <T, R extends void>(key: Keys, action?: (p?: T) => R) =>
      (e: KeyboardEvent) => {
        if (e.key === key && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((prev) => !prev);
          if (typeof action !== "undefined") {
            action();
          }
        }
      },
    [setOpen],
  );

  const keyListener = useCallback((keydownFn: (e: KeyboardEvent) => void) => {
    return {
      add: () => document.addEventListener("keydown", keydownFn),
      remove: () => document.removeEventListener("keydown", keydownFn),
    };
  }, []);

  return {
    open,
    close,
    search,
    setOpen,
    searchFn,
    filterFn,
    onKeyDown,
    keyListener,
    stopPropagation,
  };
};
