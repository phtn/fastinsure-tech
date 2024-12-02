"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { getTheme, type Modes, setTheme } from "../actions";
import { Switch } from "@nextui-org/react";
import {
  BoltIcon,
  BoltSlashIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
interface ThemeProps {
  theme: Modes;
  toggleTheme: VoidFunction;
  devThemeToggle: VoidFunction;
}
const ThemeCtx = createContext<ThemeProps | null>(null);

export const Theme = ({ children }: PropsWithChildren) => {
  const [theme, setThemeState] = useState<Modes>("dark");

  useEffect(() => {
    getTheme().then(setThemeState).catch(console.log);
  }, []);

  const stableValues = useMemo(
    () => ({
      theme,
      devThemeToggle: () => (theme === "dev" ? "devDark" : "dev"),
      toggleTheme: () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setThemeState(newTheme);
        setTheme(newTheme).catch(console.log);
      },
    }),
    [theme],
  );

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

export const ThemeSwitch = () => {
  const { toggleTheme, theme } = useThemeCtx();

  const isSelected = useMemo(() => theme === "light", [theme]);
  return (
    <div className="flex flex-col gap-4">
      <Switch
        size="sm"
        color="primary"
        isSelected={isSelected}
        onChange={toggleTheme}
        thumbIcon={isSelected ? <MoonIcon /> : <SunIcon />}
        classNames={{
          wrapper:
            "border-[0.33px] dark:bg-dock-dark/30 border-fade-dark shadow-inner",
          thumb: "bg-fade-dark dark:bg-adam/50",
          thumbIcon: "text-chalk drop-shadow-md",
        }}
      />
    </div>
  );
};

export const DevThemeSwitch = () => {
  const { devThemeToggle, theme } = useThemeCtx();

  const isSelected = useMemo(
    () => theme === "dark" || theme === "devdark",
    [theme],
  );
  return (
    <div className="flex flex-col gap-2">
      <Switch
        size="sm"
        color="primary"
        isSelected={isSelected}
        onChange={devThemeToggle}
        thumbIcon={isSelected ? <BoltIcon /> : <BoltSlashIcon />}
        classNames={{
          wrapper: "border-[0.33px] border-void shadow-inner",
          thumb: "bg-dock-dark dark:bg-transparent",
          thumbIcon: "drop-shadow-md",
        }}
      />
    </div>
  );
};
