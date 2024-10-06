import { env } from "@/env";
import { type ParsedToken } from "firebase/auth";
import { z } from "zod";

export const VerifyIdTokenSchema = z.object({
  idToken: z.string(),
});
export type VerifyIdToken = z.infer<typeof VerifyIdTokenSchema>;

export const verifyIdToken = async (params: VerifyIdToken) => {
  const url = env.RE_UP_SECURE_URL;
  return (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
  ).json() as object;
};

export const example_token = {
  iss: "https://securetoken.google.com/your-project-id",
  aud: "your-project-id",
  // auth_time: 1609459200,
  user_id: "abcd1234",
  sub: "abcd1234",
  // iat: 1609459200,
  // exp: 1609462800,
  email: "user@example.com",
  email_verified: true,
  firebase: {
    identities: {
      // email: ["user@example.com"],
    },
    sign_in_provider: "password",
  },
  uid: "abcd1234",
} satisfies ParsedToken;

export const actual_token = {
  auth_time: 1728209519,
  iss: "https://securetoken.google.com/project-id",
  aud: "fastinsure-f1801",
  exp: 1728236049,
  iat: 1728232449,
  sub: "oponton69",
  uid: "oponton69",
  firebase: {
    sign_in_provider: "password",
    tenant: "",
    identities: {
      email: ["op@forever.fine"],
    },
  },
};
