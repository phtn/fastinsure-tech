import { env } from "@/env";
import { type AxiosInstance } from "axios";

export const createEndpoint = (endpoint: string) => {
  if (env.NODE_ENV === "development") {
    return env.RE_UP_SECURE_DEV + endpoint;
  }
  return env.RE_UP_SECURE_DEV + endpoint;
};

export const btoa = (string: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(string).toString("base64");
  }
  return window.btoa(string);
};

export const createFn = <TParams, TReturn>(
  fn: (params: TParams, axiosInstance: AxiosInstance) => Promise<TReturn>,
  axiosInstance: AxiosInstance,
) => {
  return (data: TParams) => fn(data, axiosInstance);
};
export const specialFn = <TParams, TReturn>(
  fn: (axiosInstance: AxiosInstance, params: TParams) => Promise<TReturn>,
  axiosInstance: AxiosInstance,
  specialParams: TParams,
) => {
  return (data: TParams) => {
    if (specialParams) return fn(axiosInstance, specialParams);
    return fn(axiosInstance, data);
  };
};
export const createNoParamFn = <TReturn>(
  fn: (axiosInstance: AxiosInstance) => Promise<TReturn>,
  axiosInstance: AxiosInstance,
) => {
  return () => fn(axiosInstance);
};
