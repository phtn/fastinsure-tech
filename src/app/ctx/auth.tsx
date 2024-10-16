"use client";

import { auth } from "@/lib/auth";
import { type SignInWithEmailAndPassword } from "@/lib/auth/resource";
import { useSignIn } from "@/lib/auth/useSignIn";
import { useSignOut } from "@/lib/auth/useSignOut";
import { setAuthKeyCookie } from "@/lib/secure/callers";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { onSuccess } from "./toasts";
import { getAuthKey } from "../actions";
// import { useRUSecure } from "@/lib/auth/useRUSecure";

interface AuthCtxValues {
  user: User | null;
  loading: boolean;
  signWithEmail: (params: SignInWithEmailAndPassword) => Promise<void>;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  authKey: string | undefined;
  setAuthKey: (key: string) => Promise<string>;
  // pending: boolean;
}
const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [authKey, setAuthKeyState] = useState<string | undefined>();
  const router = useRouter();

  const { signWithEmail, signWithGoogle, loading } = useSignIn();
  const { signOut } = useSignOut();
  // const { serverified, pending } = useRUSecure(user);

  useEffect(() => {
    getAuthKey("fastinsure--auth-key").then(setAuthKeyState).catch(console.log);
  }, []);

  const setAuthKey = useCallback(async (key: string) => {
    const status = await setAuthKeyCookie(key);
    if (typeof status === "string") {
      onSuccess(status);
    }
    return status;
  }, []);

  useEffect(() => {
    const authState = () => {
      onAuthStateChanged(auth, (current) => {
        setUser(current);
        if (!current) {
          router.push("/");
          return;
        }

        // if (!!serverified?.verified) {
        //   router.push(`/authed/${current.uid}`);
        // }
      });
    };
    return () => {
      authState();
    };
  }, [router, authKey]);

  // Use useMemo to ensure stableUser is only recreated when user changes
  const stableValues = useMemo(
    () => ({
      user: user ?? null,
      loading,
      // pending,
      signWithEmail,
      signWithGoogle,
      signOut,
      authKey,
      setAuthKey,
    }),
    [
      authKey,
      setAuthKey,
      // pending,
      user,
      loading,
      signWithEmail,
      signWithGoogle,
      signOut,
    ],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("User context is null");
  return context;
};
