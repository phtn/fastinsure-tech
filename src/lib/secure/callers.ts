"use server";

import { api } from "@/trpc/server";
import { type VerifyIdToken } from "./reqs";

export const verifyIdToken = async (params: VerifyIdToken) =>
  api.auth.verifyIdToken(params);
