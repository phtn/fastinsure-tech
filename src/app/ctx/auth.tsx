"use client";

import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import {
  GoogleAuthProvider,
  type OAuthCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as logout,
  type User,
  type ParsedToken,
  type IdTokenResult,
  onAuthStateChanged,
} from "firebase/auth";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
  useEffect,
} from "react";
import { Err, Ok } from "@/utils/helpers";
import { verifyIdToken } from "@/lib/secure/callers";
import {
  deleteAuthClient,
  deleteRefresh,
  deleteSession,
  deleteUID,
  getHCode,
  setIdToken,
  setRefresh,
  setUID,
} from "@/app/actions";

import { type EmailAndPassword } from "../signin/schema";
import { type UserRole } from "@/lib/secure/resource";
import { onError } from "./toasts";

interface AuthCtxValues {
  loading: boolean;
  googleSigning: boolean;
  user: User | null;
  signOut: () => Promise<void>;
  signWithGoogle: () => Promise<void>;
  signUserWithEmail: (args: EmailAndPassword) => Promise<void>;
  registered: boolean;
  userRecord: IdTokenResult | null;
  oauth: OAuthCredential | null;
  claims: UserRole[] | null;
}

interface VerificationPayload {
  id_token: string | undefined;
  uid: string | undefined;
  email: string | null;
  group_code?: string | undefined;
}

const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userRecord, setUserRecord] = useState<IdTokenResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [oauth, setOAuth] = useState<OAuthCredential | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [claims, setClaims] = useState<UserRole[] | null>(null);
  const [googleSigning, setGoogleSigning] = useState(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const router = useRouter();

  const signUserWithEmail = useCallback(
    async ({ email, password }: EmailAndPassword) => {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const u = userCredential?.user;
      if (u) {
        setUser(u);
        router.push("/dashboard");
        await initVerification(
          u,
          setClaims,
          setUserRecord,
          setRegistered,
          setLoading,
        );
      } else {
        onError("Unable to sign in.");
        setLoading(false);
      }
    },
    [router],
  );

  const signWithGoogle = useCallback(async () => {
    setGoogleSigning(true);
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const u = userCredential.user;
    if (u) {
      router.push("/dashboard");
      setUser(u);
      await initVerification(
        u,
        setClaims,
        setUserRecord,
        setRegistered,
        setLoading,
      );
    }
    const oauthCredential =
      GoogleAuthProvider.credentialFromResult(userCredential);
    setOAuth(oauthCredential);
    setGoogleSigning(false);
  }, [router]);

  const signOut = useCallback(async () => {
    await logout(auth)
      .then(Ok(setLoading, "Signed out."))
      .catch(Err(setLoading, "Error signing out."));
    await deleteSession();
    await deleteRefresh();
    await deleteUID();
    await deleteAuthClient();
  }, []);

  useEffect(() => {
    setLoading(true);
    const authState = onAuthStateChanged(
      auth,
      (u) => {
        if (u) {
          setUser(u);
          initVerification(
            u,
            setClaims,
            setUserRecord,
            setRegistered,
            setLoading,
          ).catch(Err(setLoading));
        } else {
          setUser(null);
          router.push("/");
        }
        setLoading(false);
      },
      Err(setLoading),
    );

    return () => {
      authState();
    };
  }, [user, router]);

  const stableValues = useMemo(
    () => ({
      user,
      oauth,
      claims,
      signOut,
      userRecord,
      registered,
      googleSigning,
      signWithGoogle,
      signUserWithEmail,
      loading,
    }),
    [
      user,
      oauth,
      claims,
      signOut,
      userRecord,
      registered,
      googleSigning,
      signWithGoogle,
      signUserWithEmail,
      loading,
    ],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
};

const initVerification = async (
  u: User,
  setClaims: Dispatch<SetStateAction<UserRole[] | null>>,
  setUserRecord: Dispatch<SetStateAction<IdTokenResult | null>>,
  setRegistered: Dispatch<SetStateAction<boolean>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const id_token = await u.getIdToken();
  const refresh = (await u.getIdTokenResult()).token;
  const customClaims = (await u.getIdTokenResult()).claims;
  const record = await u.getIdTokenResult();
  setClaims(filterActiveClaims(customClaims));
  setUserRecord(record);

  const hcode = await getHCode();
  const group_code = hcode?.split("--")[1] ?? "";

  await setUID(u.uid);
  await setIdToken(id_token);
  await setRefresh(refresh);
  const payload: VerificationPayload = {
    id_token,
    uid: u.uid,
    email: u.email,
    group_code,
  };

  const result = await verifyIdToken(payload);
  if (result?.data) {
    if (result.data.key !== "neo") {
      setRegistered(true);
    }
  }
  setLoading(false);
};

const filterActiveClaims = (customClaims: ParsedToken) => {
  if (!customClaims) return null;
  const allowedRoles = ["admin", "manager", "agent", "agent2", "underwriter"];

  return Object.entries(customClaims)
    .filter(([key, value]) => value && allowedRoles.includes(key))
    .map(([key]) => key as UserRole);
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("User context is null");
  return context;
};
