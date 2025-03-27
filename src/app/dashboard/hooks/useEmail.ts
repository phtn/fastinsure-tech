import { sendEmail } from "@/server/email/callers";
import { asyncFn } from "@/utils/async";


export const useEmail = () => {
  const send = asyncFn(sendEmail);
  return { send};
};
