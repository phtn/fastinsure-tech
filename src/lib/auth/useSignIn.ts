import {
  GoogleAuthProvider,
  type OAuthCredential,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "./";
import { Err } from "@/utils/helpers";

export type SignInResponse = {
  idToken: string;
  user: User;
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [oauth, setOAuth] = useState<OAuthCredential | null>(null);

  const signWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await userCredential.user.getIdToken().catch(Err(setLoading));
    const oauthCredential =
      GoogleAuthProvider.credentialFromResult(userCredential);
    setUser(userCredential.user);
    setOAuth(oauthCredential);
    setLoading(false);
  };

  return {
    signWithGoogle,
    loading,
    oauth,
    user,
  };
};
