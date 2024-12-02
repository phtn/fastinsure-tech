"use server";

import { activateUser, getUser, verifyAgentCode } from "@/lib/secure/callers";
import {
  ActivateUserSchema,
  type HCodeParams,
  HCodeParamsSchema,
  type UserRecord,
} from "@/lib/secure/resource";
import { cookies } from "next/headers";
import { env } from "@/env";
import { GoogleAuth } from "google-auth-library";

export type Modes = "light" | "dark" | "system" | "dev" | "devdark";
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
  const cookieStore = await cookies();
  const id_token = cookieStore.get("fastinsure--session")?.value;
  const uid = cookieStore.get("fastinsure--uid")?.value;
  if (!id_token || !uid) return;
  const result = await getUser({ id_token, uid });
  if (!result) return;
  return result.data;
};

export const getRefresh = async () => {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("fastinsure--refresh")?.value;
  return refresh;
};

export const setUID = async (uid: string) => {
  const cookieStore = await cookies();
  cookieStore.set("fastinsure--uid", uid, {
    ...defaultOpts,
    path: "/",
  });
};

export const getUID = async () => {
  const cookieStore = await cookies();
  const uid = cookieStore.get("fastinsure--uid")?.value;
  return uid ?? null;
};
export const deleteUID = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("fastinsure--uid");
};

export const setAuthKey = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.set("fastinsure--auth-key", key, defaultOpts);
  return "auth-key-set";
};

export const getAuthKey = async (key?: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(key ?? "fastinsure--auth-key")?.value;
};

export const setTheme = async (theme: Modes) => {
  const cookieStore = await cookies();
  cookieStore.set("fastinsure_mode", theme, { ...defaultOpts, path: "/" });
  return `mode set to ${theme}`;
};

export const getTheme = async (): Promise<Modes> => {
  const cookieStore = await cookies();
  const light = "light";
  const mode = cookieStore.get("fastinsure_mode")?.value as Modes;
  return mode ?? light;
};

export const deleteThemes = async () => {
  const cookieStore = await cookies();
  return cookieStore.delete("fastinsure_mode");
};

export const setHCode = async (key: string) => {
  const cookieStore = await cookies();
  cookieStore.set("fastinsure--hcode", key, { ...defaultOpts, path: "/" });
  return `key set to ${key}`;
};

export const getHCode = async () => {
  const cookieStore = await cookies();
  const hcode = cookieStore.get("fastinsure--hcode")?.value;
  return hcode;
};

export const deleteHCode = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("fastinsure--hcode");
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
  const cookieStore = await cookies();
  if (idToken) {
    cookieStore.set("fastinsure--session", idToken, {
      ...defaultOpts,
      path: "/",
    });
  }
};
export const setRefresh = async (refreshToken: string | undefined) => {
  const cookieStore = await cookies();
  if (refreshToken) {
    cookieStore.set("fastinsure--refresh", refreshToken, {
      ...defaultOpts,
      path: "/",
    });
  }
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const value = cookieStore.get("fastinsure--session")?.value;
  return value;
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("fastinsure--session");
};

export const deleteRefresh = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("fastinsure--refresh");
};

export type SidebarAnimate = "auto" | "manual";
export const setSidebarAnimate = async (animate: SidebarAnimate) => {
  const cookieStore = await cookies();
  cookieStore.set("fastinsure--sidebar-animate", animate, {
    ...defaultOpts,
    path: "/dashboard",
  });
};

export const getSidebarAnimate = async () => {
  const cookieStore = await cookies();
  const animate = cookieStore.get("fastinsure--sidebar-animate")?.value;
  return animate;
};

export const googleAuthClient = async () => {
  const scopes: string[] = ["https://www.googleapis.com/auth/cloud-platform"];
  const credentials = JSON.parse(env.ADC) as object;
  const auth = new GoogleAuth({
    credentials,
    scopes,
  });
  return await auth.getClient();
};

export const deleteAuthClient = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("fastinsure--ocr-proc");
};

export const activateAccount = async (data: FormData) => {
  const id_token = await getSession();
  const uid = await getUID();

  const validatedParams = ActivateUserSchema.safeParse({
    hcode: data.get("hcode"),
    email: data.get("email"),
    id_token,
    uid,
  });

  if (validatedParams.error) {
    console.log("Invalid params");
    console.table(validatedParams.error);
  }

  console.log(validatedParams.data);

  if (validatedParams.success) {
    if (!id_token || !uid) return;
    const response = await activateUser({
      ...validatedParams.data,
    });
    return response?.data;
  }
};
export const setCustomClaims = async (claims: string) => {
  const cookieStore = await cookies();
  if (claims)
    cookieStore.set("fastinsure--claims", claims?.toString(), {
      ...defaultOpts,
      path: "/",
    });
};

export const getCustomClaims = async () => {
  const cookieStore = await cookies();
  const value = cookieStore.get("fastinsure--claims")?.value;
  return value?.split(",");
};

export const deleteCustomClaims = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("fastinsure--claims");
};
