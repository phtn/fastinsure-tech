import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ADC: z.string(),
    PROJECT_ID: z.string(),
    PROCESSOR_LOC: z.string(),
    CR_PROCESSOR: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    CONVEX_DEPLOYMENT: z.string(),
    RE_UP_SECURE_URL: z.string().url(),
    RE_UP_SECURE_DEV_URL: z.string().url(),
    RE_UP_SECURE_API_KEY: z.string(),
    FASTINSURE_REFRESH_TOKEN: z.string(),
    FASTINSURE_EMAIL: z.string().email(),
    FASTINSURE_UID: z.string(),
  },
  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string().url(), // NEXT_PUBLIC_ADC: z.string(),
  },

  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  runtimeEnv: {
    ADC: process.env.ADC,
    PROJECT_ID: process.env.PROJECT_ID,
    PROCESSOR_LOC: process.env.PROCESSOR_LOC,
    CR_PROCESSOR: process.env.CR_PROCESSOR,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    RE_UP_SECURE_URL: process.env.RE_UP_SECURE_URL,
    RE_UP_SECURE_DEV_URL: process.env.RE_UP_SECURE_DEV_URL,
    RE_UP_SECURE_API_KEY: process.env.RE_UP_SECURE_API_KEY,
    FASTINSURE_REFRESH_TOKEN: process.env.FASTINSURE_REFRESH_TOKEN,
    FASTINSURE_EMAIL: process.env.FASTINSURE_EMAIL,
    FASTINSURE_UID: process.env.FASTINSURE_UID,
    NODE_ENV: process.env.NODE_ENV,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
