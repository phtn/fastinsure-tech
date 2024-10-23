"use server";

import { env } from "@/env";
import type {
  AgentCode,
  AuthVerification,
  TokenVerification,
  VerifyAuthKey,
  VerifyIdToken,
} from "./resource";

export interface ServerStatus {
  data: string;
}

const claimsUrl = "http://localhost:19818/v1/claims";
const livenessUrl = "http://localhost:19818/livez";
const url = env.RE_UP_SECURE_URL;
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
  const response = await fetch(url + "/verifyIdToken", {
    ...config.post,
    body: JSON.stringify(params),
  });
  return response.json() as Promise<AuthVerification>;
};

export const verifyAuthKey = async (params: VerifyAuthKey) => {
  const response = await fetch(url + "/verifyAuthKey", {
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
  return response.json() as Promise<AgentCode>;
};

// SERVER STATUS
export const getServerHealth = async () => {
  const response = await fetch(livenessUrl, {
    ...config.get,
  });
  return response.json() as Promise<ServerStatus>;
};

// DEBUG MODES
export const devSet = async (params: TokenVerification) => {
  const response = await fetch(url + "/devSet", {
    ...config.post,
    body: JSON.stringify(params),
  });
  return response.json() as Promise<object>;
};

export const devGet = async () => {
  const response = await fetch(url + "/devGet", {
    ...config.post,
  });
  return response.json() as Promise<object>;
};

// export const example_token = {
//   iss: "https://securetoken.google.com/your-project-id",
//   aud: "your-project-id",
//   auth_time: 1609459200,
//   user_id: "abcd1234",
//   sub: "abcd1234",
//   iat: 1609459200,
//   exp: 1609462800,
//   email: "user@example.com",
//   email_verified: true,
//   firebase: {
//     identities: {
//       email: ["user@example.com"],
//     },
//     sign_in_provider: "password",
//   },
//   uid: "abcd1234",
// } satisfies TokenVerificationResult;
