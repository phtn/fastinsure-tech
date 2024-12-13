import "server-only";
import { createAxiosInstance } from "./axios";
import { createFn, createNoParamFn } from "./utils";
import {
  activateAccount,
  getUser,
  verifyOnSignin,
  verifyUser,
} from "./handlers/auth";
import { status, verifyActivationCode } from "./handlers/server";
import { userCode } from "./handlers/manager";
import { verifyCode } from "./handlers/agent";

const Secure = () => {
  const ax = createAxiosInstance({});

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
