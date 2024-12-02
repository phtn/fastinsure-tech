import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { LivezResponse } from "../resource";

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
