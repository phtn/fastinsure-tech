"use server";

import { getClaims, getUser, verifyAgentCode } from "@/lib/secure/callers";
import {
  type HCodeParams,
  HCodeParamsSchema,
  type UserRecord,
} from "@/lib/secure/resource";
import { type RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { EmailAndPasswordSchema } from "./signin/schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/auth";
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

export const getUID = async () => cookies().get("fastinsure--uid")?.value;

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

export const signUserWithEmail = async (formData: FormData) => {
  const validatedFields = EmailAndPasswordSchema.safeParse({
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userCredential = await signInWithEmailAndPassword(
    auth,
    validatedFields.data.email,
    validatedFields.data.password,
  );
  const id_token = await userCredential.user.getIdToken();
  const user = userCredential.user;
  const refresh_token = user.refreshToken;

  cookies().set("fastinsure--session", id_token, {
    ...defaultOpts,
    path: "/",
  });
  cookies().set("fastinsure--refresh", refresh_token, {
    ...defaultOpts,
    path: "/",
  });
  cookies().set("fastinsure--uid", user.uid, {
    ...defaultOpts,
    path: "/",
  });

  const hcodeCookie = await getHCode();

  const group_code = hcodeCookie?.value.split("--")[1];

  const verification_payload = {
    id_token,
    uid: user?.uid,
    email: user?.email,
    group_code,
  };

  const result = await getClaims(verification_payload);

  if (result.data.rawId) {
    if (hcodeCookie) {
      await deleteHCode();
    }
  }
  return result.data;
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

export const deleteUID = async () => {
  cookies().delete("fastinsure--uid");
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
