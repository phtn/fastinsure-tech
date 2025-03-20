"use server";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { AgentCodeResponse, VerifyIdToken } from "../resource";

export const createCode = async (
  data: VerifyIdToken,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.post<AgentCodeResponse | null>(
    "/generate-code",
    data,
    config,
  );
  return response.data;
};
