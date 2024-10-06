import { z } from "zod";

export const SignInWithEmailAndPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
export type SignInWithEmailAndPassword = z.infer<
  typeof SignInWithEmailAndPasswordSchema
>;

export const SignInWithPhoneNumberSchema = z.object({
  phoneNumber: z.string().min(10),
});
export type SignInWithPhoneNumber = z.infer<typeof SignInWithPhoneNumberSchema>;

export const CreateCustomTokenSchema = z.object({
  uid: z.string(),
});
export type CreateCustomToken = z.infer<typeof CreateCustomTokenSchema>;

export const SignInWithGoogleSchema = z.object({
  idToken: z.string(),
});
export type SignInWithGoogle = z.infer<typeof SignInWithGoogleSchema>;

export const SignInWithGithubSchema = z.object({
  accessToken: z.string(),
});
export type SignInWithGithub = z.infer<typeof SignInWithGithubSchema>;

export const SignInWithTwitterSchema = z.object({
  accessToken: z.string(),
});
export type SignInWithTwitter = z.infer<typeof SignInWithTwitterSchema>;

export const SignInWithFacebookSchema = z.object({
  accessToken: z.string(),
});
export type SignInWithFacebook = z.infer<typeof SignInWithFacebookSchema>;

export const SignInWithCustomTokenSchema = z.object({
  token: z.string(),
});
export type SignInWithCustomToken = z.infer<typeof SignInWithCustomTokenSchema>;
