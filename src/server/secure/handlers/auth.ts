"use server";

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type {
  AccountActivationParams,
  AccountActivationResponse,
  GetUserParams,
  GetUserResponse,
  OnSigninVerification,
  OnSigninVerificationResponse,
  UserVerification,
  UserVerificationResponse,
} from "../resource";

export const verifyUser = async (
  data: UserVerification,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.post<UserVerificationResponse>(
    "/v1/auth/verify-user",
    data,
    config,
  );
  return response;
};

export const verifyOnSignin = async (
  data: OnSigninVerification,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.post<OnSigninVerificationResponse>(
    "/v1/auth/verify-on-signin",
    data,
    config,
  );
  return response.data;
};

export const getUser = async (
  data: GetUserParams,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.post<GetUserResponse>(
    "/v1/auth/get-user",
    data,
    config,
  );
  return response.data;
};

export const activateAccount = async (
  data: AccountActivationParams,
  ax: AxiosInstance,
  config?: AxiosRequestConfig,
) => {
  const response = await ax.post<AccountActivationResponse>(
    "/v1/auth/activate-account",
    data,
    config,
  );
  return response.data;
};
