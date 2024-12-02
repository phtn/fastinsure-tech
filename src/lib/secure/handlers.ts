"use server";

import { env } from "@/env";
import type {
  AgentCode,
  AuthVerification,
  AccountTokenResponse,
  TokenVerification,
  VerifyIdToken,
  AccountToken,
  HCodeParams,
  HCodeResponse,
  UserRecord,
  GetUser,
  ActivateUser,
  ActivateUserResponse,
} from "./resource";
import { createEndpoint } from "../utils";
import { getRefresh } from "@/app/actions";

export type ServerStatus = string;

const livenessUrl = createEndpoint("/livez");
const verifyAgentCodeUrl = createEndpoint("/verify-agent-code");
const authUrl = createEndpoint("/v1/auth");
const claimsUrl = createEndpoint("/v1/claims");
const adminUrl = createEndpoint("/v1/admin");

const config = {
  post: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Allow-Control-Allow-Origin": "*",
      "X-API-Key": env.RE_UP_SECURE_API_KEY,
    },
  },
  get: {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": env.RE_UP_SECURE_API_KEY,
    },
  },
};

export const verifyIdToken = async (params: VerifyIdToken) => {
  const refresh = await getRefresh();
  if (!refresh) return;
  const response = await fetch(authUrl + "/verify-id-token", {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": refresh,
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: AuthVerification }>;
};

export const getUser = async (params: GetUser) => {
  const response = await fetch(authUrl + "/get-user", {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": String(await getRefresh()),
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: UserRecord }>;
};

export const createAgentCode = async (params: VerifyIdToken) => {
  const response = await fetch(claimsUrl + "/create-code", {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": String(await getRefresh()),
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: AgentCode }>;
};

export const verifyAgentCode = async (params: HCodeParams) => {
  const response = await fetch(verifyAgentCodeUrl, {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": String(await getRefresh()),
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: HCodeResponse }>;
};

// SERVER STATUS
export const getServerHealth = async () => {
  const response = await fetch(livenessUrl, {
    ...config.get,
  });
  return response.json() as Promise<ServerStatus>;
};

export const createAccountToken = async (params: AccountToken) => {
  const response = await fetch(adminUrl + "/create-account-token", {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": String(await getRefresh()),
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<AccountTokenResponse>;
};

export const getClaims = async (params: VerifyIdToken) => {
  const response = await fetch(authUrl + "/get-claims", {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": String(await getRefresh()),
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: UserRecord }>;
};

export const activateUser = async (params: ActivateUser) => {
  const refresh = await getRefresh();
  if (!refresh) return;
  const response = await fetch(authUrl + "/activate-user", {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": refresh,
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: ActivateUserResponse }>;
};

// DEBUG MODES
export const devSet = async (params: TokenVerification) => {
  const response = await fetch(authUrl + "/dev-set", {
    ...config.post,
    headers: {
      ...config.post.headers,
      "X-Refresh-Token": String(await getRefresh()),
    },
    body: JSON.stringify(params),
  });
  return response.json() as Promise<object>;
};

export const devGet = async () => {
  const response = await fetch(authUrl + "/dev-get", {
    ...config.post,
  });
  return response.json() as Promise<object>;
};
