import { env } from "@/env";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createEndpoint = (endpoint: string) => {
  if (env.NODE_ENV === "development") {
    return env.RE_UP_SECURE_DEV_URL + endpoint;
  }
  return env.RE_UP_SECURE_URL + endpoint;
};
