"use server";

import { cookies } from "next/headers";

export type Modes = "light" | "dark";
export interface ModeCookie {
  name: string;
  value: Modes;
  path: string;
}

export const setAuthKey = async (key: string) =>
  cookies().set("fastinsure_auth_key", key, { secure: true });

export const getAuthKey = async () => cookies().get("fastinsure_auth_key");

export const setTheme = async (theme: Modes) => {
  cookies().set("fastinsure_mode", theme, { secure: true, path: "/" });
  return `mode set to ${theme}`;
};

export const getTheme = async (): Promise<string> => {
  const light = "light" as Modes;
  return cookies().get("fastinsure_mode")?.value ?? light;
};

export const deleteThemes = async () => cookies().delete("fastinsure_mode");
