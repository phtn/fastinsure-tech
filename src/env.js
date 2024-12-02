import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ADC: z.string(),
    AD: z.string(),
    PROJECT_ID: z.string(),
    PROCESSOR_LOC: z.string(),
    CR_PROCESSOR: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    CONVEX_DEPLOYMENT: z.string(),
    RE_UP_SECURE_URL: z.string().url(),
    RE_UP_SECURE_DEV: z.string(),
    RE_UP_SECURE_API_KEY: z.string(),
    FASTINSURE_REFRESH_TOKEN: z.string(),
    FASTINSURE_EMAIL: z.string().email(),
    FASTINSURE_UID: z.string(),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string().url(), // NEXT_PUBLIC_ADC: z.string(),
    NEXT_PUBLIC_F_API_KEY: z.string(),
    NEXT_PUBLIC_F_AUTH_DOMAIN: z.string(),
    NEXT_PUBLIC_F_PROJECT_ID: z.string(),
    NEXT_PUBLIC_F_STORAGE: z.string(),
    NEXT_PUBLIC_F_MESSAGING: z.string(),
    NEXT_PUBLIC_F_APP_ID: z.string(),
    NEXT_PUBLIC_F_LENGTH: z.string(),
    NEXT_PUBLIC_DEVS: z.string(),
  },

  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  runtimeEnv: {
    ADC: process.env.ADC,
    AD: process.env.AD,
    PROJECT_ID: process.env.PROJECT_ID,
    PROCESSOR_LOC: process.env.PROCESSOR_LOC,
    CR_PROCESSOR: process.env.CR_PROCESSOR,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    RE_UP_SECURE_URL: process.env.RE_UP_SECURE_URL,
    RE_UP_SECURE_DEV: process.env.RE_UP_SECURE_DEV,
    RE_UP_SECURE_API_KEY: process.env.RE_UP_SECURE_API_KEY,
    FASTINSURE_REFRESH_TOKEN: process.env.FASTINSURE_REFRESH_TOKEN,
    FASTINSURE_EMAIL: process.env.FASTINSURE_EMAIL,
    FASTINSURE_UID: process.env.FASTINSURE_UID,
    NEXT_PUBLIC_F_API_KEY: process.env.NEXT_PUBLIC_F_API_KEY,
    NEXT_PUBLIC_F_AUTH_DOMAIN: process.env.NEXT_PUBLIC_F_AUTH_DOMAIN,
    NEXT_PUBLIC_F_PROJECT_ID: process.env.NEXT_PUBLIC_F_PROJECT_ID,
    NEXT_PUBLIC_F_STORAGE: process.env.NEXT_PUBLIC_F_STORAGE,
    NEXT_PUBLIC_F_MESSAGING: process.env.NEXT_PUBLIC_F_MESSAGING,
    NEXT_PUBLIC_F_APP_ID: process.env.NEXT_PUBLIC_F_APP_ID,
    NEXT_PUBLIC_F_LENGTH: process.env.NEXT_PUBLIC_F_LENGTH,
    NEXT_PUBLIC_DEVS: process.env.NEXT_PUBLIC_DEVS,
    NODE_ENV: process.env.NODE_ENV,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
