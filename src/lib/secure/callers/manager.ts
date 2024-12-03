"use server";

import { asyncFn } from "@/server/api/utils";
import { api } from "@/trpc/server";

export const generateCode = asyncFn(api.manager.generateCode);
