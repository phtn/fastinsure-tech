"use client";

import { auth } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";
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
  type FC,
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
import type { AuthVerification, UserRole } from "@/lib/secure/resource";
import { onError, onSuccess } from "./toasts";
import { Loader } from "@/ui/loader";
import { useVex } from "./convex";

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
  verifyCurrentUser: (u: User | null) => Promise<AuthVerification | undefined>;
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

  const verifyCurrentUser = useCallback(async (u: User | null) => {
    if (!u) return;
    const id_token = await u.getIdToken();
    const payload: VerificationPayload = {
      id_token,
      uid: u.uid,
      email: u.email,
    };

    const vresult = await verifyIdToken(payload);
    return vresult?.data;
    // const existingUser = await usr.get.byId(u.uid);
    // if (!existingUser) {
    //   await usr.create({
    //     uid: u.uid,
    //     email: u.email ?? "",
    //     nickname: u.displayName ?? "",
    //     is_active: true,
    //     is_verified: false,
    //     photo_url: u.photoURL ?? "",
    //     phone_number: u.phoneNumber ?? "",
    //   });
    // }
    // if (
    //   existingUser?.group_code &&
    //   vresult?.group_code &&
    //   existingUser.group_code !== vresult.group_code
    // ) {
    //   await usr.update({ uid: u.uid, group_code: vresult.group_code });
    // }
  }, []);

  const cleanUpCookies = useCallback(async () => {
    await deleteSession();
    await deleteRefresh();
    await deleteUID();
    await deleteAuthClient();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setLoading(true);
      if (u) {
        setLoading(false);
        setUser(u);
      } else {
        setLoading(false);
        cleanUpCookies().catch(Err);
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router, cleanUpCookies]);

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
        onSuccess("Authentication successful!");
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
    [],
  );

  const signWithGoogle = useCallback(async () => {
    setGoogleSigning(true);
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const u = userCredential.user;
    if (u) {
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
  }, []);

  const signOut = useCallback(async () => {
    await logout(auth)
      .then(Ok(setLoading, "Signed out."))
      .catch(Err(setLoading, "Error signing out."));
    await cleanUpCookies();
    router.push("/");
  }, [router, cleanUpCookies]);

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
      verifyCurrentUser,
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
      verifyCurrentUser,
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
    console.table(result.data);
    if (result.data.key !== "neo") {
      setRegistered(true);
    }
    return result.data;
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

export const withAuth = (Component: FC) => {
  const SecuredComponent = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const { usr } = useVex();
    const checkUser = useCallback(
      async (u: User | null) => {
        if (!u) return;
        const exists = await usr.get.byId(u.uid);
        if (!exists) {
          await usr.create({
            uid: u.uid,
            email: u.email ?? "",
            nickname: u.displayName ?? "",
            is_active: true,
            is_verified: false,
            photo_url: u.photoURL ?? "",
            phone_number: u.phoneNumber ?? "",
          });
        }
      },
      [usr],
    );
    useEffect(() => {
      setLoading(true);
      const authState = onAuthStateChanged(auth, (u) => {
        if (u) {
          router.push("/dashboard");
          setLoading(false);
          checkUser(u).catch(Err);
        } else if (pathname === "/signin") {
          router.push("/signin");
          setLoading(false);
        } else {
          router.push("/");
          setLoading(false);
        }
      });
      return () => authState();
    }, [router, pathname, checkUser]);

    if (loading) return <Loader />;

    return <Component />;
  };

  return SecuredComponent;
};
