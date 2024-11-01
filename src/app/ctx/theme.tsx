"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { getTheme, setTheme } from "../actions";
import { type SwitchProps, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
interface ThemeProps {
  theme: string;
  toggleTheme: VoidFunction;
}
const ThemeCtx = createContext<ThemeProps | null>(null);

export const Theme = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<string>("light");

  useEffect(() => {
    getTheme().then(setThemeState).catch(console.log);
  }, []);

  const stableValues = useMemo(() => {
    const toggleTheme = () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setThemeState(newTheme);
      setTheme(newTheme).catch(console.log);
    };
    return { theme, toggleTheme };
  }, [theme]);

  return (
    <ThemeCtx.Provider value={stableValues}>
      <body className={`bg-background text-foreground ${theme}`}>
        {children}
      </body>
    </ThemeCtx.Provider>
  );
};

export const useThemeCtx = () => {
  const context = useContext(ThemeCtx);
  if (!context) throw new Error("No Theme context");
  return context;
};

export const ThemeSwitch = (props: SwitchProps) => {
  const { theme, toggleTheme } = useThemeCtx();
  const darkMode = useMemo(() => theme === "dark", [theme]);
  const { Component, slots, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch(props);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} onChange={toggleTheme} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "h-6 w-6 p-0.5",
              "flex items-center justify-center",
              "rounded-lg bg-foreground text-background hover:border-[0.33px] hover:border-background/60 hover:bg-foreground hover:text-background hover:dark:border-background/60",
            ],
          })}
        >
          {darkMode ? (
            <SunIcon className="size-3.5" />
          ) : (
            <MoonIcon className="size-3.5" />
          )}
        </div>
      </Component>
    </div>
  );
};
