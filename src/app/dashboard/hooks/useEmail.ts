"use client"

import { type EmailContext } from "@/lib/email/schema";
import { sendEmail } from "@/server/email/callers";


export const useEmail = () => {
  const send = async (params: EmailContext) => {
    return await sendEmail(params)
  };
  return { send};
};
