"use server";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { HCodeParams, HCodeResponse } from "../resource";
// import { getConfig } from "./utils";

export const verifyCode = async (
  data: HCodeParams,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  // const config = await getConfig();
  const response = await ax.post<HCodeResponse | null>(
    "/verify-agent-code",
    data,
    config,
  );
  return response.data;
};
