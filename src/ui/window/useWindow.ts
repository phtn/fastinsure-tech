import {
  ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import {
  stopPropagation as stopProp,
  searchFn as sfn,
  onKeyDown as okd,
  keyListener as kl,
  close as closeFn,
  type FilterProps,
  type Keys,
} from "./utils";

export interface UseWindow {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const useWindow = ({ open, setOpen }: UseWindow) => {
  const [search, setSearch] = useState("");
  const close = useCallback(() => closeFn(setOpen), [setOpen]);

  const searchFn = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const stopPropagation = useCallback(() => stopProp, []);
  const onKeyDown = useCallback((k: Keys) => okd(k, setOpen), [setOpen]);
  const keyListener = useCallback((fn: () => void) => kl(fn), []);

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
