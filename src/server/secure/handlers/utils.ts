"use server";

import { getRefresh, getSession } from "@/app/actions";
import { env } from "@/env";
import type { AxiosRequestConfig } from "axios";

let idToken: string | undefined = undefined;
let refresh: string | undefined = undefined;

export const getConfig = async (): Promise<AxiosRequestConfig> => {
  idToken ??= await getSession();
  refresh ??= await getRefresh();

  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${idToken}`,
      "X-Refresh-Token": refresh,
      "X-API-Key": env.RE_UP_SECURE_API_KEY,
      "Content-Type": "application/json",
    },
  };

  return config;
};
