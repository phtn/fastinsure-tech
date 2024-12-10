"use server";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type {
  OnSigninVerification,
  OnSigninVerificationResponse,
  UserVerification,
  UserVerificationResponse,
} from "../resource";
import { getRefresh, getSession } from "@/app/actions";
import { env } from "@/env";

export const verifyUser = async (data: UserVerification, ax: AxiosInstance) => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${await getSession()}`,
      "X-Refresh-Token": await getRefresh(),
      "X-API-Key": env.RE_UP_SECURE_API_KEY,
      "Content-Type": "application/json",
    },
  };
  const response = await ax.post<UserVerificationResponse>(
    "/v1/auth/verify-user",
    data,
    config,
  );
  return response;
};

export const verifyOnSignin = async (
  data: OnSigninVerification,
  ax: AxiosInstance,
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${await getSession()}`,
      "X-Refresh-Token": await getRefresh(),
      "X-API-Key": env.RE_UP_SECURE_API_KEY,
      "Content-Type": "application/json",
    },
  };
  const response = await ax.post<OnSigninVerificationResponse>(
    "/v1/auth/verify-on-signin",
    data,
    config,
  );
  return response.data;
};
