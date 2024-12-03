"use server";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { AgentCodeResponse, VerifyIdToken } from "../resource";

export const userCode = async (
  data: VerifyIdToken,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.post<AgentCodeResponse | null>(
    "/v1/claims/create-code",
    data,
    config,
  );
  return response.data;
};
