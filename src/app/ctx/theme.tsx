"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { getTheme, type Modes, setTheme } from "../actions";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { Err } from "@/utils/helpers";
import { keyListener, onKeyDown } from "@/ui/window/utils";
interface ThemeProps {
  theme: Modes;
  toggle: VoidFunction;
}
const ThemeCtx = createContext<ThemeProps | null>(null);

export const Theme = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<Modes>("dark");

  useEffect(() => {
    getTheme().then(setThemeState).catch(Err);
  }, []);

  const stableValues = useMemo(
    () => ({
      theme,
      toggle: () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setThemeState(newTheme);
        setTheme(newTheme).catch(Err);
      },
    }),
    [theme],
  );

  return (
    <ThemeCtx.Provider value={stableValues}>
      <main className={`bg-background text-foreground ${theme}`}>
        {children}
      </main>
    </ThemeCtx.Provider>
  );
};

export const useThemeCtx = () => {
  const context = useContext(ThemeCtx);
  if (!context) throw new Error("No Theme context");
  return context;
};

export const ThemeSwitch = () => {
  const { toggle, theme } = useThemeCtx();
  const isSelected = useMemo(() => theme === "light", [theme]);

  const toggleSwitch = useCallback(() => {
    const event = new KeyboardEvent("keydown", {
      key: "i",
      bubbles: true,
      cancelable: true,
      metaKey: true,
      ctrlKey: true,
    });
    document.dispatchEvent(event);
  }, []);

  const { add, remove } = keyListener(onKeyDown("i", toggle));

  useEffect(() => {
    add();
    return () => remove();
  }, [add, remove]);

  return (
    <div className="flex flex-col gap-4">
      <Switch
        size="sm"
        color="primary"
        isSelected={isSelected}
        onChange={toggleSwitch}
        thumbIcon={isSelected ? <MoonIcon /> : <SunIcon />}
        classNames={{
          wrapper:
            "border-[0.33px] dark:bg-dock-dark/30 bg-fade-dark border-fade-dark/80 shadow-inner dark:shadow-dock-dark shadow-zinc-950/40",
          thumb: "bg-dock-dark border-[0.2px] border-fade-dark dark:bg-adam/50",
          thumbIcon: "text-warning dark:text-icon-dark drop-shadow-md",
        }}
      />
    </div>
  );
};
