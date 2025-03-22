import { type AxiosInstance } from "axios";

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

export const getCookie = (name: string): string | undefined => {
  if (typeof document !== "undefined") {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }
};
