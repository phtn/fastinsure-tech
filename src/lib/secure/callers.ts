"use server";

import { api } from "@/trpc/server";
// import { getAuthKey, setAuthKey } from "@/app/actions";
import { asyncFn } from "@/server/api/utils";

export const verifyIdToken = asyncFn(api.auth.verifyIdToken);
export const getUser = asyncFn(api.auth.getUser);
export const activateUser = asyncFn(api.auth.activateUser);
// export const setAuthKeyCookie = asyncFn(setAuthKey);

// SHARED
export const getClaims = asyncFn(api.auth.getClaims);

// MANAGER CLAIMS
export const createAgentCode = asyncFn(api.auth.createAgentCode);
export const verifyAgentCode = asyncFn(api.server.verifyAgentCode);
export const createAccountToken = asyncFn(api.auth.createAccountToken);

// AXIOS SERVER STATUS

// DEBUG MODES
export const devSet = asyncFn(api.auth.devSet);
export const devGet = asyncFn(api.auth.devGet);
