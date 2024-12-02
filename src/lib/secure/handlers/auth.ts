import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type {
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
    "/v1/auth/verify-user",
    data,
    config,
  );
  return response.data;
};
