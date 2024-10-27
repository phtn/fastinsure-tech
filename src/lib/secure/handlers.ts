"use server";

import { env } from "@/env";
import type {
  AgentCode,
  AuthVerification,
  AccountTokenResponse,
  TokenVerification,
  VerifyAuthKey,
  VerifyIdToken,
  AccountToken,
} from "./resource";
import { createEndpoint } from "../utils";

export interface ServerStatus {
  data: string;
}

const livenessUrl = createEndpoint("/livez");
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
  const response = await fetch(authUrl + "/verify-id-token", {
    ...config.post,
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: AuthVerification }>;
};

export const verifyAuthKey = async (params: VerifyAuthKey) => {
  const response = await fetch(authUrl + "/verify-auth-key", {
    ...config.post,
    body: JSON.stringify(params),
  });
  return response.json() as Promise<AuthVerification>;
};

export const createAgentCode = async (params: VerifyIdToken) => {
  const response = await fetch(claimsUrl + "/create-code", {
    ...config.post,
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: AgentCode }>;
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
    body: JSON.stringify(params),
  });
  return response.json() as Promise<AccountTokenResponse>;
};

export const getClaims = async (params: VerifyIdToken) => {
  const response = await fetch(authUrl + "/get-claims", {
    ...config.post,
    body: JSON.stringify(params),
  });
  return response.json() as Promise<{ data: unknown }>;
};

// DEBUG MODES
export const devSet = async (params: TokenVerification) => {
  const response = await fetch(authUrl + "/dev-set", {
    ...config.post,
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
