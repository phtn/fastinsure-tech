import { type AxiosHeaders } from "axios";
import { createAxiosInstance } from "./axios";
import { createFn, createNoParamFn } from "../utils";
import { verifyOnSignin, verifyUser } from "./handlers/auth";
import { env } from "@/env";
import { status } from "./handlers/server";

const Secure = (headers?: AxiosHeaders) => {
  const ax = createAxiosInstance({
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": env.RE_UP_SECURE_API_KEY,
    },
  });

  return {
    auth: {
      verifyUser: createFn(verifyUser, ax),
      verifyOnSignin: createFn(verifyOnSignin, ax),
    },
    server: {
      getLivez: createNoParamFn(status, ax),
      getReadyz: createNoParamFn(status, ax),
    },
  };
};

export { Secure };
