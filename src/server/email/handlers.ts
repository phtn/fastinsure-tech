import { type EmailContext } from "@/lib/email/schema";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

export const sendEmail = async (
  data: EmailContext,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.post<object | null>(
    "/send-email",
    data,
    config,
  );
  return response.data;
};
