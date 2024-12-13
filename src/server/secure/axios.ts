import { env } from "@/env";
import axios, { type AxiosRequestConfig } from "axios";

export const createAxiosInstance = (config?: AxiosRequestConfig) =>
  axios.create({
    ...config,
    headers: {
      common: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": env.RE_UP_SECURE_API_KEY,
      },
      ...config?.headers,
    },
    baseURL:
      env.NODE_ENV === "production"
        ? env.RE_UP_SECURE_URL
        : env.RE_UP_SECURE_DEV,
  });
