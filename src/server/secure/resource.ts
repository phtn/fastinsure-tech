import { z } from "zod";

/// SERVER

export const QueryServer = z.object({
  Code: z.string(),
  Err: z.record(z.string()).or(z.string()),
  Message: z.string(),
  Status: z.number(),
});
export type QServer = z.infer<typeof QueryServer>;
export const ServerResponseSchema = z.object({
  Code: z.string(),
  Data: z.record(z.string()).or(z.string()),
  Err: z.record(z.string()).or(z.string()),
  Message: z.string(),
  Status: z.number(),
});
export type ServerResponse = z.infer<typeof ServerResponseSchema>;

export const LivezResponseSchema = ServerResponseSchema;
export type LivezResponse = z.infer<typeof LivezResponseSchema>;

///////////////////

export const UserVerificationSchema = z.object({
  uid: z.string().or(z.undefined()),
  id_token: z.string(),
  refresh_token: z.string(),
});
export type UserVerification = z.infer<typeof UserVerificationSchema>;

export const UserVerificationResponseDataSchema = z.object({
  uid: z.string(),
  verified: z.boolean(),
  claims: z.record(z.boolean()).nullable(),
});
export type UserVerificationResponseData = z.infer<
  typeof UserVerificationResponseDataSchema
>;
export const UserVerificationResponseSchema = z
  .object({
    Data: UserVerificationResponseDataSchema,
  })
  .merge(QueryServer);
export type UserVerificationResponse = z.infer<
  typeof UserVerificationResponseSchema
>;

export const OnSigninVerificationSchema = z.object({
  uid: z.string().or(z.undefined()),
  id_token: z.string(),
  refresh_token: z.string(),
});
export type OnSigninVerification = z.infer<typeof OnSigninVerificationSchema>;

export const GetUserResponseDataSchema = z.object({
  uid: z.string(),
  is_verified: z.boolean(),
  group_code: z.string().optional(),
  email: z.string(),
  id: z.string(),
  phone_number: z.string().optional(),
  nickname: z.string().optional(),
  group_id: z.string(),
  photo_url: z.string().optional(),
  is_active: z.boolean(),
  address_id: z.string().optional(),
  name: z.string(),
});
export type OnSigninVerificationResponseData = z.infer<
  typeof GetUserResponseDataSchema
>;

export const OnSigninVerificationResponseSchema = z
  .object({
    Data: GetUserResponseDataSchema,
  })
  .merge(QueryServer);
export type OnSigninVerificationResponse = z.infer<
  typeof OnSigninVerificationResponseSchema
>;

export const GetUserParamsSchema = z.object({
  uid: z.string().or(z.undefined()),
});
export type GetUserParams = z.infer<typeof GetUserParamsSchema>;

export type GetUserResponseData = z.infer<typeof GetUserResponseDataSchema>;
export const GetUserResponseSchema = z
  .object({
    Data: GetUserResponseDataSchema,
  })
  .merge(QueryServer);
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>;

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
  group_code: z.string().optional(),
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
  uid: z.string().optional(),
  verified: z.boolean(),
  claims: z.record(z.boolean()).nullable(),
});
export type AuthVerification = z.infer<typeof AuthVerificationSchema>;

export const GetUserSchema = z.object({
  id_token: z.string(),
  uid: z.string(),
});
export type GetUser = z.infer<typeof GetUserSchema>;

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

export const AgentCodeSchema = z.object({
  code: z.string(),
  url: z.string().url(),
  expiry: z.number(),
});
export type AgentCode = z.infer<typeof AgentCodeSchema>;

export const AgentCodeResponseSchema = z
  .object({
    Data: AgentCodeSchema,
  })
  .merge(QueryServer);
export type AgentCodeResponse = z.infer<typeof AgentCodeResponseSchema>;

export const HCodeSchema = z.object({
  hkey: z.string().or(z.null()),
  grp: z.string().or(z.null()),
  nonce: z.string().or(z.null()),
  sha: z.string().or(z.null()),
});
export type HCode = z.infer<typeof HCodeSchema>;

export const HCodeDetailSchema = z
  .object({
    expiry: z.string().or(z.null()),
    verified: z.boolean().or(z.null()),
  })
  .merge(HCodeSchema);
export type HCodeDetail = z.infer<typeof HCodeDetailSchema>;

export const HCodeParamsSchema = z.object({
  code: z.string().min(6).max(6).optional(),
  hkey: z.string().optional(),
  grp: z.string().optional(),
  nonce: z.string().optional(),
  sha: z.string().optional(),
});
export type HCodeParams = z.infer<typeof HCodeParamsSchema>;

export const HCodeResponseDataSchema = z.object({
  verified: z.boolean(),
  expiry: z.number().or(z.undefined()),
  url: z.string().url().or(z.undefined()),
  group_code: z.string().or(z.undefined()),
});
export type HCodeResponseData = z.infer<typeof HCodeResponseDataSchema>;

export const HCodeResponseSchema = z
  .object({
    Data: HCodeResponseDataSchema,
  })
  .merge(QueryServer);
export type HCodeResponse = z.infer<typeof HCodeResponseSchema>;

const UserMetadataSchema = z.object({
  CreationTimestamp: z.number(),
  LastLogInTimestamp: z.number(),
  LastRefreshTimestamp: z.number(),
});
export const UserRecordSchema = z.object({
  email: z.string().email(),
  providerId: z.string(),
  rawId: z.string(),
  photoURL: z.string().url().optional().nullable(),
  CustomClaims: z.record(z.boolean()).nullable(),
  Disabled: z.boolean(),
  EmailVerified: z.boolean(),
  ProviderUserInfo: z.array(z.record(z.string().or(z.number()))),
  TokensValidAfterMillis: z.number(),
  UserMetadata: UserMetadataSchema,
  TenantID: z.string(),
  MultiFactor: z.object({ EnrolledFactors: z.any().nullable() }),
});

export type UserRecord = z.infer<typeof UserRecordSchema>;

export const AccountActivationParamsSchema = z.object({
  id_token: z.string(),
  uid: z.string(),
  email: z.string().or(z.undefined()),
  hcode: z.string(),
});
export type AccountActivationParams = z.infer<
  typeof AccountActivationParamsSchema
>;

export const AccountActivationResponseDataSchema = z.object({
  group_code: z.string(),
  valid: z.boolean(),
});
export type AccountActivationResponseData = z.infer<
  typeof AccountActivationResponseDataSchema
>;

export const AccountActivationResponseSchema = z
  .object({
    Data: AccountActivationResponseDataSchema,
  })
  .merge(QueryServer);
export type AccountActivationResponse = z.infer<
  typeof AccountActivationResponseSchema
>;
