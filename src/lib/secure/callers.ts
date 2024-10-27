"use server";

import { api } from "@/trpc/server";
import { getAuthKey, setAuthKey } from "@/app/actions";
import { asyncFn } from "@/server/api/utils";

export const verifyIdToken = asyncFn(api.auth.verifyIdToken);
export const getAuthKeyCookie = asyncFn(getAuthKey);
export const setAuthKeyCookie = asyncFn(setAuthKey);

// SHARED
export const getClaims = asyncFn(api.auth.getClaims);

// MANAGER CLAIMS
export const createAgentCode = asyncFn(api.auth.createAgentCode);
export const createAccountToken = asyncFn(api.auth.createAccountToken);

// SERVER STATUS
export const getServerStatus = asyncFn(api.server.getServerStatus);
// DEBUG MODES
export const devSet = asyncFn(api.auth.devSet);
export const devGet = asyncFn(api.auth.devGet);
