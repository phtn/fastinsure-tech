import { createAxiosInstance } from "./axios";
import { createFn, createNoParamFn, getCookie } from "./utils";
import {
  activateAccount,
  getUser,
  verifyOnSignin,
  verifyUser,
} from "./handlers/auth";
import { status, verifyActivationCode } from "./handlers/server";
import { userCode } from "./handlers/manager";
import { verifyCode } from "./handlers/agent";
import { env } from "@/env";

const Secure = () => {
  const ax = createAxiosInstance();
  ax.interceptors.request.use((config) => {
    const idToken = getCookie("fastinsure--session");
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    const refresh = getCookie("fastinsure--refresh");
    if (refresh) {
      config.headers["X-Refresh-Token"] = refresh;
    }
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";
    config.headers["X-API_Key"] = env.RE_UP_SECURE_API_KEY;

    return config;
  });

  return {
    auth: {
      verifyUser: createFn(verifyUser, ax),
      verifyOnSignin: createFn(verifyOnSignin, ax),
      getUser: createFn(getUser, ax),
      activateAccount: createFn(activateAccount, ax),
    },
    server: {
      getLivez: createNoParamFn(status, ax),
      getReadyz: createNoParamFn(status, ax),
      //
      verifyActivationCode: createFn(verifyActivationCode, ax),
    },
    manager: {
      generateCode: createFn(userCode, ax),
    },
    agent: {
      verifyCode: createFn(verifyCode, ax),
    },
  };
};

export { Secure };
