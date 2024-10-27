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
  id_token: z.string().or(z.undefined()),
  uid: z.string().nullable().or(z.undefined()),
  email: z.string().email().nullable().or(z.undefined()),
});
export type VerifyIdToken = z.infer<typeof VerifyIdTokenSchema>;

export const VerifyAuthKeySchema = z.object({
  auth_key: z.string(),
  id_token: z.string(),
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

export const AgentCodeSchema = z.object({
  key: z.string(),
  url: z.string().url(),
});
export type AgentCode = z.infer<typeof AgentCodeSchema>;

export const AccountTokenSchema = z.object({
  id_token: z.string(),
  email: z.string().email(),
  uid: z.string(),
});
export type AccountToken = z.infer<typeof AccountTokenSchema>;

export const AccountTokenResponseSchema = z.object({
  key: z.string(),
  token: z.string(),
});
export type AccountTokenResponse = z.infer<typeof AccountTokenResponseSchema>;
