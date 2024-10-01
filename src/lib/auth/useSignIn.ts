import { signInWithEmailAndPassword, type User } from "firebase/auth";
import { useState } from "react";
import { auth } from "../db";
import { warnHandler } from "@/utils/helpers";

export type EmailAndPassword = {
  email: string;
  password: string;
};

export type SignInResponse = {
  token: string;
  user: User;
};

export const useSignInWithEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [creds, setCreds] = useState<SignInResponse | null>(null);

  const signIn = async (emailAndPassword: EmailAndPassword) => {
    setLoading(true);
    setError(null);

    await signInWithEmailAndPassword(
      auth,
      emailAndPassword.email,
      emailAndPassword.password,
    )
      .then(async (credential) => {
        const user = credential.user;
        const token = await credential.user.getIdToken();
        setLoading(false);
        console.log(token);
        setCreds({ token, user });
      })
      .catch(warnHandler(setLoading, setError));
  };

  return {
    signIn,
    loading,
    error,
    creds,
  };
};
