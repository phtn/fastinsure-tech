"use client";

import { auth } from "@/lib/fire";
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
import {
  deleteAuthClient,
  deleteRefresh,
  deleteSession,
  deleteUID,
  getCustomClaims,
  setCustomClaims,
  setIdToken,
  setRefresh,
  setUID,
} from "@/app/actions";

import { EmailAndPasswordSchema } from "../signin/schema";
import type {
  OnSigninVerification,
  OnSigninVerificationResponse,
} from "@/lib/secure/resource";
import { onError, onSuccess, onWarn } from "./toasts";
import { Loader } from "@/ui/loader";
import { verifyOnSignin } from "@/lib/secure/callers/auth";
import { useVex } from "./convex";
import type { UserRole, SelectUser } from "@convex/users/d";

interface AuthCtxValues {
  loading: boolean;
  googleSigning: boolean;
  user: User | null;
  signOut: () => Promise<void>;
  signWithGoogle: () => Promise<void>;
  signUserWithEmail: (fd: FormData) => Promise<void>;
  // signUserWithEmail: (f: EmailAndPassword) => Promise<void>;
  userRecord: IdTokenResult | null;
  oauth: OAuthCredential | null;
  claims: UserRole[] | null;
  setClaims: Dispatch<SetStateAction<UserRole[] | null>>;
  vresult: OnSigninVerificationResponse | null;
  vxuser: SelectUser | null;
}

const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userRecord, setUserRecord] = useState<IdTokenResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [oauth, setOAuth] = useState<OAuthCredential | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [claims, setClaims] = useState<UserRole[] | null>(null);
  const [googleSigning, setGoogleSigning] = useState(false);
  const [vresult, setVResult] = useState<OnSigninVerificationResponse | null>(
    null,
  );
  const [vxuser, setVxuser] = useState<SelectUser | null>(null);

  const router = useRouter();
  const { usr } = useVex();

  const getClaims = useCallback(async () => {
    const cookieClaims = await getCustomClaims();
    setClaims(cookieClaims as UserRole[]);
  }, []);

  const getvx = useCallback(
    async (uid: string) => {
      const vx = await usr.get.byId(uid);
      const claimsStr = claims?.join(",") as UserRole;
      setVxuser(vx);

      if (vx && claims && vx.role !== claimsStr) {
        await usr.update({ uid, role: claimsStr });
      }
    },
    [claims, usr],
  );

  useEffect(() => {
    if (user?.uid) {
      getvx(user.uid).catch(Err);
    }
  }, [getvx, user?.uid]);

  const createvx = useCallback(async () => {
    if (!user) return;
    const { uid, displayName, email, phoneNumber, photoURL } = user;
    const vx = await usr.get.byId(uid);
    if (!vx) {
      return await usr.create({
        uid,
        email: email!,
        nickname: displayName ?? "",
        photo_url: photoURL ?? "",
        phone_number: phoneNumber ?? "",
        group_code: "neo",
      });
    }
  }, [usr, user]);

  useEffect(() => {
    createvx().catch(Err);
  }, [createvx]);

  const updateClaims = useCallback(async () => {
    const role = (claims?.join(",") ?? "neo") as UserRole;
    if (!user?.uid) return;
    if (vxuser && vxuser?.role !== role) {
      await usr.update({ uid: user.uid, role });
    }
  }, [claims, user?.uid, usr, vxuser]);

  useEffect(() => {
    updateClaims().catch(Err);
  }, [updateClaims]);

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
        setUser(u);
        // updateVxRole(u.uid).catch(Err);
        setLoading(false);
      } else {
        setLoading(false);
        cleanUpCookies().catch(Err);
      }
      getClaims().catch(Err(setLoading));
    });
    return () => unsubscribe();
  }, [router, cleanUpCookies, getClaims]);

  const signUserWithEmail = useCallback(async (f: FormData) => {
    setLoading(true);

    const validated = EmailAndPasswordSchema.safeParse({
      email: f.get("email"),
      password: f.get("password"),
    });
    if (validated.error) {
      onWarn("Invalid credentials.");
      return;
    }

    const { email, password } = validated.data;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const u = userCredential?.user;
    if (u) {
      setUser(u);
      onSuccess("Authentication successful!");
      const vres = await initVerification(u, setUserRecord, setLoading);
      setVResult(vres);
    } else {
      onError("Unable to sign in.");
      setLoading(false);
    }
  }, []);

  const signWithGoogle = useCallback(async () => {
    setGoogleSigning(true);
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const u = userCredential.user;
    if (u) {
      setUser(u);
      const vres = await initVerification(u, setUserRecord, setLoading);
      setVResult(vres);
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
      googleSigning,
      signWithGoogle,
      signUserWithEmail,
      setClaims,
      vresult,
      loading,
      vxuser,
    }),
    [
      user,
      oauth,
      claims,
      signOut,
      userRecord,
      googleSigning,
      signWithGoogle,
      signUserWithEmail,
      setClaims,
      vresult,
      loading,
      vxuser,
    ],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
};

const initVerification = async (
  u: User,
  setUserRecord: Dispatch<SetStateAction<IdTokenResult | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  const id_token = await u.getIdToken();
  const refresh_token = (await u.getIdTokenResult()).token;

  const parsedToken = (await u.getIdTokenResult()).claims;
  const customClaims = filterActiveClaims(parsedToken);

  const record = await u.getIdTokenResult();
  setUserRecord(record);

  // const hcode = await getHCode();
  // const group_code = hcode?.split("--")[1] ?? "";

  await setUID(u.uid);
  await setIdToken(id_token);
  await setRefresh(refresh_token);
  await setCustomClaims(customClaims?.join(",") ?? "");
  const vParams: OnSigninVerification = {
    id_token,
    refresh_token,
    uid: u.uid,
  };

  const r = await verifyOnSignin(vParams);
  setLoading(false);
  return r;
};

export const filterActiveClaims = (customClaims: ParsedToken) => {
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

    useEffect(() => {
      setLoading(true);
      const authState = onAuthStateChanged(auth, (u) => {
        if (u) {
          router.push("/dashboard");
          setLoading(false);
        }
      });
      setLoading(false);
      return () => authState();
    }, [router, pathname]);

    if (loading) return <Loader />;

    return <Component />;
  };

  return SecuredComponent;
};

/**
 *  async/await inferred params wrapper
 *
 */
export const asyncFn =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async (params: TParams) =>
    await fn(params);

/** Async/Await tRPC */
interface RParams<T> {
  input: T;
}

export const asyncX =
  <TReturn,>(fn: () => Promise<TReturn>) =>
  async () =>
    await fn();

/** Async/Await tRPC */
interface RParams<T> {
  input: T;
}

/**
 * @name asyncR
 * @description
 */
export const asyncGS =
  <TParams, TReturn>(
    gfn: () => Promise<TReturn | null | undefined>,
    sfn: (p: TParams) => Promise<void>,
  ) =>
  async (p: TParams) => {
    const result = await gfn();
    return result ?? (await sfn(p));
  };

export const asyncGS2 = <TParams, TReturn>(
  gfn: () => Promise<TReturn | null | undefined>,
  sfn: (p: TParams) => Promise<void>,
) => asyncFn(gfn) ?? asyncFn(sfn);

export const asyncRx =
  <TParams, TReturn>(fn: (params: TParams) => Promise<TReturn>) =>
  async ({ input }: RParams<TParams>) => {
    const result = await fn(input);
    return JSON.stringify(result);
  };

/*
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
*/

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
