"use server";

import { api } from "@/trpc/server";
import { getAuthKey, setAuthKey } from "@/app/actions";
import { asyncFn } from "@/server/api/utils";

export const verifyIdToken = asyncFn(api.auth.verifyIdToken);
export const getAuthKeyCookie = asyncFn(getAuthKey);
export const setAuthKeyCookie = asyncFn(setAuthKey);

/*
 * DEV-SERVER-TEST
 */

export const ruConn = asyncFn(api.auth.ruConn);
export const devSet = asyncFn(api.auth.devSet);
export const devGet = asyncFn(api.auth.devGet);
