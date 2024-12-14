"use server";
import { asyncFn } from "@/server/api/utils";
import { api } from "@/trpc/server";

export const verifyUser = asyncFn(api.auth.verifyUser);
export const verifyOnSignin = asyncFn(api.auth.verifyOnSignin);
export const getUser = asyncFn(api.auth.getUser);
export const activateAccount = asyncFn(api.auth.activateAccount);
