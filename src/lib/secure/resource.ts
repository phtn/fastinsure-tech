import { z } from "zod";

const ProviderSchema = z.object({
  sign_in_provider: z.string(),
  tenant: z.string(),
  identities: z.object({
    email: z.array(z.string().email()),
  }),
});

export const TokenVerificationSchema = z.object({
  auth_time: z.number(),
  iss: z.string().url(),
  aud: z.string(),
  exp: z.number(),
  iat: z.number(),
  sub: z.string(),
  uid: z.string(),
  firebase: ProviderSchema,
});
export type TokenVerification = z.infer<typeof TokenVerificationSchema>;

export const VerifyIdTokenSchema = z.object({
  idToken: z.string().or(z.undefined()),
  uid: z.string(),
  email: z.string().email().nullable(),
});
export type VerifyIdToken = z.infer<typeof VerifyIdTokenSchema>;

export const VerifyAuthKeySchema = z.object({
  authKey: z.string(),
  idToken: z.string(),
  uid: z.string(),
  email: z.string().email().nullable(),
});
export type VerifyAuthKey = z.infer<typeof VerifyAuthKeySchema>;

export const AuthVerificationSchema = z.object({
  key: z.string().optional(),
  verified: z.boolean(),
  exp: z.number().optional(),
});
export type AuthVerification = z.infer<typeof AuthVerificationSchema>;

export const devToken = {
  auth_time: Date.now(),
  iss: "https://securetoken.re-up.ph/project-id",
  aud: "fastinsure",
  exp: Date.now() + 36000,
  iat: Date.now(),
  sub: "olivia69p",
  uid: "Idk34oht9s8df9as",
  firebase: {
    sign_in_provider: "password",
    tenant: "",
    identities: {
      email: ["op@forever.fine"],
    },
  },
} satisfies TokenVerification;
