"use server"

import { api } from "@/trpc/server";
import { asyncFn } from "@/utils/async";

export const activateUser = asyncFn(api.workflow.activateUser)
