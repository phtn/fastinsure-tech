"use server";

import { asyncFn } from "@/server/api/utils";
import { api } from "@/trpc/server";
export const getLivez = asyncFn(api.server.getLivez);
export const getReadyz = asyncFn(api.server.getReadyz);
