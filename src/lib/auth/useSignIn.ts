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
import { useRouter } from "next/navigation";

export type SignInResponse = {
  idToken: string;
  user: User;
};

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [user, setUser] = useState<User | null>(null);
  const [oauth, setOAuth] = useState<OAuthCredential | null>(null);
  const [verified, setVerified] = useState(false);

  const router = useRouter();

  const signWithEmail = async (params: SignInWithEmailAndPassword) => {
    setLoading(true);
    setError(null);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      params.email,
      params.password,
    );
    const id_token = await userCredential.user.getIdToken();
    const user = userCredential.user;
    setUser(user);

    const result = await verifyIdToken({
      id_token,
      uid: user?.uid,
      email: user?.email,
    });
    if (result.data.verified) {
      setVerified(result.data.verified);
      router.push("/authed/" + user?.uid);
    }

    setLoading(false);
    console.log(result);
  };

  const signWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    await userCredential.user.getIdToken().catch(errHandler(setLoading));
    const oauthCredential =
      GoogleAuthProvider.credentialFromResult(userCredential);
    setUser(userCredential.user);
    setOAuth(oauthCredential);
    setLoading(false);
  };

  return {
    signWithEmail,
    signWithGoogle,
    verified,
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
