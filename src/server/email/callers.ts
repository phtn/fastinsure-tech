"use server"

import { api } from "@/trpc/server";
// import { asyncFn } from "../api/utils";
import { type EmailContext } from "@/lib/email/schema";

export const sendEmail = async (params: EmailContext) => {
  return await api.email.send(params)
}
