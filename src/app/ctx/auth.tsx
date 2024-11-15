"use client";

import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/lib/auth/useSignIn";
import { useSignOut } from "@/lib/auth/useSignOut";
import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { errHandler } from "@/utils/helpers";
import { getUser } from "@/lib/secure/callers";
import type { GetUser, UserRecord } from "@/lib/secure/resource";
import { getUserRecord } from "../actions";

type Claim = Record<string, boolean> | null;

interface AuthCtxValues {
  user: UserRecord | null;
  loading: boolean;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  filterActiveClaims: (c: Claim) => string[];
  setClaims: Dispatch<SetStateAction<string[]>>;
  claims: string[];
  getUserInfo: (p: GetUser) => void;
  uid: string | undefined;
}

const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserRecord | null>(null);
  const [claims, setClaims] = useState<string[]>([]);
  const [updating, setUpdating] = useState(false);
  const [uid, setUID] = useState<string | undefined>();
  const router = useRouter();

  const filterActiveClaims = useCallback((customClaims: Claim) => {
    if (!customClaims) return [];

    return Object.entries(customClaims)
      .filter(([_, v]) => v)
      .map(([k]) => k);
  }, []);

  const getUserInfo = useCallback(
    async (params: GetUser) => {
      const result = await getUser(params);
      setUser(result.data);
      setUID(result.data.rawId);

      if (claims?.length === 0) {
        setClaims(filterActiveClaims(result.data.CustomClaims));
      }
    },
    [claims, filterActiveClaims],
  );

  useEffect(() => {
    getUserRecord()
      .then((data) => {
        if (data) {
          console.table(data);
          setClaims(filterActiveClaims(data.CustomClaims));
          setUser(data);
        }
      })
      .catch(console.error);
  }, [filterActiveClaims]);

  const { signWithGoogle, loading } = useSignIn();
  const { signOut } = useSignOut();

  useEffect(() => {
    setUpdating(true);
    const authState = onAuthStateChanged(
      auth,
      (current) => {
        setUID(current?.uid);
      },
      errHandler(setUpdating),
    );

    return authState;
  }, [user, router]);

  const stableValues = useMemo(
    () => ({
      user,
      uid,
      loading: loading && updating,
      signWithGoogle,
      signOut,
      filterActiveClaims,
      setClaims,
      claims,
      getUserInfo,
    }),
    [
      uid,
      filterActiveClaims,
      user,
      loading,
      signWithGoogle,
      signOut,
      updating,
      setClaims,
      claims,
      getUserInfo,
    ],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("User context is null");
  return context;
};
