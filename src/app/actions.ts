"use server";

import { verifyAgentCode } from "@/lib/secure/callers";
import { type HCodeParams, HCodeParamsSchema } from "@/lib/secure/resource";
import { type RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export type Modes = "light" | "dark";
export interface ModeCookie {
  name: string;
  value: Modes;
  path: string;
}

export const setArbitrary = async (key: string) => {
  cookies().set("arbitrary--auth-key", key, { secure: true });
  return "arbi-key-set";
};

export const setAuthKey = async (key: string) => {
  cookies().set("fastinsure--auth-key", key, { secure: true });
  return "auth-key-set";
};

export const getAuthKey = async (key?: string) => {
  const cstore = cookies();
  const k = cstore.get(key ?? "fastinsure--auth-key")?.value;
  console.log(k);
  return k;
};

export const setTheme = async (theme: Modes) => {
  cookies().set("fastinsure_mode", theme, { secure: true, path: "/" });
  return `mode set to ${theme}`;
};

export const getTheme = async (): Promise<string> => {
  const light = "light" as Modes;
  return cookies().get("fastinsure_mode")?.value ?? light;
};

export const deleteThemes = async () => cookies().delete("fastinsure_mode");

export const setHCode = async (key: string) => {
  cookies().set("fastinsure--hcode", key, { secure: true });
  return `key set to ${key}`;
};

export const getHCode = async (): Promise<RequestCookie | undefined> => {
  const hcode = cookies().get("fastinsure--hcode");
  return hcode;
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
