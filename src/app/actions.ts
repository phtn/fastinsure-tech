"use server";

import { getUser, verifyAgentCode } from "@/lib/secure/callers";
import {
  type HCodeParams,
  HCodeParamsSchema,
  type UserRecord,
} from "@/lib/secure/resource";
import { type RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { env } from "@/env";

export type Modes = "light" | "dark" | "system";
export interface ModeCookie {
  name: string;
  value: Modes;
  path: string;
}

const defaultOpts = {
  secure: env.NODE_ENV === "production",
  httpOnly: true,
  sameSite: "lax" as const,
};

export const getUserRecord = async (): Promise<UserRecord | undefined> => {
  const id_token = cookies().get("fastinsure--session")?.value;
  const uid = cookies().get("fastinsure--uid")?.value;
  if (!id_token || !uid) return;
  const result = await getUser({ id_token, uid });
  if (!result) return;
  return result.data;
};

export const getRefresh = async () => {
  const refresh = cookies().get("fastinsure--refresh")?.value;
  return refresh;
};

export const setUID = async (uid: string | undefined) => {
  if (uid) {
    return cookies().set("fastinsure--uid", uid, {
      ...defaultOpts,
      path: "/",
    });
  }
};
export const getUID = async () => cookies().get("fastinsure--uid")?.value;
export const deleteUID = async () => {
  cookies().delete("fastinsure--uid");
};

export const setAuthKey = async (key: string) => {
  cookies().set("fastinsure--auth-key", key, defaultOpts);
  return "auth-key-set";
};

export const getAuthKey = async (key?: string) => {
  const cstore = cookies();
  const k = cstore.get(key ?? "fastinsure--auth-key")?.value;
  console.log(k);
  return k;
};

export const setTheme = async (theme: Modes) => {
  cookies().set("fastinsure_mode", theme, { ...defaultOpts, path: "/" });
  return `mode set to ${theme}`;
};

export const getTheme = async (): Promise<Modes> => {
  const light = "light";
  const mode = cookies().get("fastinsure_mode")?.value as Modes;
  return mode ?? light;
};

export const deleteThemes = async () => cookies().delete("fastinsure_mode");

export const setHCode = async (key: string) => {
  cookies().set("fastinsure--hcode", key, { ...defaultOpts, path: "/" });
  return `key set to ${key}`;
};

export const getHCode = async (): Promise<RequestCookie | undefined> => {
  const hcode = cookies().get("fastinsure--hcode");
  return hcode;
};

export const deleteHCode = async () => {
  cookies().delete("fastinsure--hcode");
};

export const verifyHCode = async (decoded: HCodeParams, formData: FormData) => {
  const validatedFields = HCodeParamsSchema.safeParse({
    key_code: formData.get("key_code")?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const response = await verifyAgentCode({
    ...validatedFields.data,
    ...decoded,
  });
  return response.data;
};

export const setIdToken = async (idToken: string | undefined) => {
  if (idToken) {
    cookies().set("fastinsure--session", idToken, {
      ...defaultOpts,
      path: "/",
    });
  }
};
export const setRefresh = async (refreshToken: string | undefined) => {
  if (refreshToken) {
    cookies().set("fastinsure--refresh", refreshToken, {
      ...defaultOpts,
      path: "/",
    });
  }
};

export const getSession = async () => {
  const value = cookies().get("fastinsure--session")?.value;
  return value;
};

export const deleteSession = async () => {
  cookies().delete("fastinsure--session");
};

export const deleteRefresh = async () => {
  cookies().delete("fastinsure--refresh");
};

export type SidebarAnimate = "auto" | "manual";
export const setSidebarAnimate = async (animate: SidebarAnimate) => {
  cookies().set("fastinsure--sidebar-animate", animate, {
    ...defaultOpts,
    path: "/dashboard",
  });
};

export const getSidebarAnimate = async () => {
  const animate = cookies().get("fastinsure--sidebar-animate")?.value;
  return animate;
};
