import {
  GoogleAuthProvider,
  type OAuthCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "./";
import { errHandler } from "@/utils/helpers";
import { type SignInWithEmailAndPassword } from "./resource";
import { verifyIdToken } from "../secure/callers";

export type SignInResponse = {
  idToken: string;
  user: User;
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [user, setUser] = useState<User | null>(null);
  const [idToken, setIdToken] = useState("");
  const [oauth, setOAuth] = useState<OAuthCredential | null>(null);

  const signWithEmail = async (params: SignInWithEmailAndPassword) => {
    setLoading(true);
    setError(null);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      params.email,
      params.password,
    );
    const idToken = await userCredential.user.getIdToken();

    await verifyIdToken({ idToken }).then(console.log).catch(console.log);

    setUser(userCredential.user);
    setIdToken(idToken);
    setLoading(false);
  };

  const signWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await userCredential.user
      .getIdToken()
      .then(setIdToken)
      .catch(errHandler(setLoading));
    const oauthCredential =
      GoogleAuthProvider.credentialFromResult(userCredential);
    setUser(userCredential.user);
    setOAuth(oauthCredential);
    setLoading(false);
  };

  return {
    signWithEmail,
    signWithGoogle,
    idToken,
    loading,
    error,
    oauth,
    user,
  };
};

/*
{
  "auth_time": 1728165216,
  "iss": "https://securetoken.google.com/fastinsure-f1801",
  "aud": "fastinsure-f1801",
  "exp": 1728168816,
  "iat": 1728165216,
  "sub": "N7yCd3kCViMA0jD3eNuv5rqKxgy1",
  "uid": "N7yCd3kCViMA0jD3eNuv5rqKxgy1",
  "firebase": {
    "sign_in_provider": "password",
    "tenant": "",
    "identities": {
      "email": [
        "hq@re-up.ph"
      ]
    }
  }
}
*/
