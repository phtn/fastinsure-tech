"use server";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HCodeParams, HCodeResponse, LivezResponse } from "../resource";

export const status = async (
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.get<LivezResponse | null>(
    config?.url ?? "/livez",
    config,
  );
  return response.data;
};

export const verifyActivationCode = async (
  data: HCodeParams,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.post<HCodeResponse>(
    "/verify-activation-code",
    data,
    config,
  );
  return response.data;
};
