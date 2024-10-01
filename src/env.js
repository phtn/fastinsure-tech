import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    ADC: z.string(),
    PROJECT_ID: z.string(),
    PROCESSOR_LOC: z.string(),
    CR_PROCESSOR: z.string(),
  },
  client: {
    // NEXT_PUBLIC_ADC: z.string(),
  },

  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },

  runtimeEnv: {
    ADC: process.env.ADC,
    PROJECT_ID: process.env.PROJECT_ID,
    PROCESSOR_LOC: process.env.PROCESSOR_LOC,
    CR_PROCESSOR: process.env.CR_PROCESSOR,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_ADC: process.env.NEXT_PUBLIC_ADC,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  emptyStringAsUndefined: true,
});
