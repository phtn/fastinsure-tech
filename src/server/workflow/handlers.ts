import type { AxiosInstance, AxiosRequestConfig } from "axios";
import { type ActivateUserType } from "./schema";
import { createFn } from "../secure/utils";
import { createAxiosInstance } from "../secure/axios";

export const activateUser = async (
  data: ActivateUserType,
  axiosInstance: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await axiosInstance.post<string | null>(
    "/workflow",
    data,
    config,
  );
  return response.data;
};

const axFn = createAxiosInstance();

export const workflow = {
  activateUser: createFn(activateUser, axFn),
}
