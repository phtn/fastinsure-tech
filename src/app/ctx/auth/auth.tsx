import {
    deleteAuthClient,
    deleteCustomClaims,
    deleteLastLogin,
    deleteRefresh,
    deleteSession,
    deleteUID,
    getCustomClaims,
    getLastLogin,
    setIdToken,
    setLastLogin,
    setUID,
} from "@/app/actions";
import { auth } from "@/lib/fire";
import { Err } from "@/utils/helpers";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    type IdTokenResult,
    signOut as logout,
    type OAuthCredential,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    type User,
} from "firebase/auth";
import { redirect, usePathname, useRouter } from "next/navigation";
import {
    createContext,
    type Dispatch,
    type FC,
    type PropsWithChildren,
    type SetStateAction,
    type TransitionStartFunction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from "react";
import { EmailAndPasswordSchema } from "@/app/auth/schema";
import type {
    OnSigninVerificationResponse,
} from "@/server/secure/resource";
import { Loader } from "@/ui/loader";
import type { SelectUser, UserRole } from "@convex/users/d";
import moment from "moment";
import { useVex } from "../convex";
import {onError, onSuccess, onWarn } from "../toasts";
import { activationGet } from "@/server/rdb/caller";
import type { ActivationSet } from "@/server/rdb/schema";

interface AuthCtxValues {
  loading: boolean;
  googleSigning: boolean;
  user: User | null;
  signOut: () => Promise<void>;
  signWithGoogle: () => Promise<void>;
  signUserWithEmail: (fd: FormData) => Promise<void>;
  signupUserWithEmail: (fd: FormData) => Promise<void>;
  userRecord: IdTokenResult | null;
  oauth: OAuthCredential | null;
  claims: UserRole[] | null;
  setClaims: Dispatch<SetStateAction<UserRole[] | null>>;
  vresult: OnSigninVerificationResponse | null;
  vxuser: SelectUser | null;
  activateFn: (hcode: string) => Promise<string | null>;
}

const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userRecord] = useState<IdTokenResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [oauth, setOAuth] = useState<OAuthCredential | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [claims, setClaims] = useState<UserRole[] | null>(null);
  const [googleSigning, setGoogleSigning] = useState(false);
  const [vresult] = useState<OnSigninVerificationResponse | null>(null);

  const [vxuser, setVxuser] = useState<SelectUser | null>(null);
  const { usr, logs } = useVex();

  const uid = useMemo(() => user?.uid, [user?.uid]);

  const [, fn] = useTransition();

  const setFn = <T, P>(
    transition: TransitionStartFunction,
    action: (p: P | undefined) => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
      transition(async (p = undefined) => {
        const r = await action(p);
        set(r);
      })
  }

  const createLog = useCallback(
    async (id: string | undefined, type: string) => {
      if (id) await logs.create({ uid: id, type });
    },
    [logs],
  );

  const getClaims = useCallback(() => {
    setFn(fn, getCustomClaims, setClaims);
  }, []);

  // const verify = useCallback(async (u: User) => {
  // const vres = await initVerification(
  //   u,
  //   setUserRecord,
  //   setClaims,
  //   setLoading,
  // );
  // const group_code = vres.Data.group_code;
  // if (!vxuser?.group_code && group_code) {
  //   await usr.update.groupCode(u.uid, group_code);
  // }

  // setVResult(vres);
  // }, []);

  const getvx = useCallback(
    async (uid: string) => {
      const vx = await usr.get.byId(uid);
      // const claimsStr = claims?.join(",") as UserRole;
      setVxuser(vx);

      // if (vx && claims && vx.role !== claimsStr) {
      //   await usr.update.userInfo({ uid, role: claimsStr });
      // }

      // const group_code = await getGroupCode();
      // if (group_code && !vx?.group_code) {
      //   await usr.update({ uid, group_code });
      // }
    },
    [usr],
  );

  useEffect(() => {
    if (uid) getvx(uid).catch(Err);
  }, [getvx, uid]);

  const createvx = useCallback(async () => {
    if (!user) return;
    const { uid, displayName, email, phoneNumber, photoURL } = user;
    const vxuid = await usr.get.byId(uid);
    const vxemail = await usr.get.byEmail(email!);
    if (!vxuid && !vxemail) {
      return await usr.create({
        uid,
        email: email!,
        nickname: displayName ?? email!,
        photo_url: photoURL ?? "",
        phone_number: phoneNumber ?? "",
      });
    }
  }, [usr, user]);

  useEffect(() => {
    createvx().catch(Err);
  }, [createvx]);

  // const updateClaims = useCallback(async () => {
  //   const role = (claims?.join(",") ?? "neo") as UserRole;
  //   if (!uid) return;
  //   if (vxuser && vxuser?.role !== role && role !== "") {
  //     await usr.update.userInfo({ uid, role });
  //   }
  // }, [claims, uid, usr, vxuser]);

  // useEffect(() => {
  //   updateClaims().catch(Err);
  // }, [updateClaims]);

  const cleanUpCookies = useCallback(async () => {
    await deleteSession();
    await deleteRefresh();
    await deleteUID();
    await deleteCustomClaims();
    await deleteAuthClient();
  }, []);

  //173414401 _ 1376
  const checkLastLogin = useCallback(async () => {
    const lastLogin = await getLastLogin();
    if (!lastLogin) {
      await setLastLogin();
      return `Logged out: ${new Date().getTime()}`;
    }
    return moment().from(Number(lastLogin));
  }, []);

  const signOut = useCallback(async () => {
    if (uid) {
      await createLog(uid, "logout");
    }
    await checkLastLogin();
    await cleanUpCookies();
    await setLastLogin();
    await logout(auth);
  }, [checkLastLogin, cleanUpCookies, createLog, uid]);

  const rte = useRouter();
  /////////////////////
  //ON_AUTH_STATE_CHANGE

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setLoading(true);
      if (u) {
        setUser(u);
        getClaims();
        setLoading(false);
        setGoogleSigning(false);
        deleteLastLogin().catch(Err);
      } else {
        setLoading(false);
        redirect("/");
      }
    });
    return () => unsubscribe();
  }, [getClaims, checkLastLogin, rte]);

  const signupUserWithEmail = useCallback(
      async (f: FormData) => {
        setLoading(true);

        const validation = EmailAndPasswordSchema.safeParse({
          email: f.get("email") as string,
          password: f.get("password") as string,
        });

        if (validation.error) {
          onWarn("Invalid credentials.");
          return setLoading(false);
        }

        const { email, password } = validation.data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        ).catch(Err(setLoading, "Invalid Credentials"));
        const u = userCredential?.user;
        setLoading(false);
        if (u) {
          setUser(u);
          await createLog(u.uid, "login");
          const idToken = await u.getIdToken();
          await setIdToken(idToken)
          await setUID(u.uid)
          onSuccess("Logged in!");
        } else {
          setLoading(false);
        }
        setLoading(false);
      },
      [createLog],
    );


  const signUserWithEmail = useCallback(
    async (f: FormData) => {
      setLoading(true);

      const validated = EmailAndPasswordSchema.safeParse({
        email: f.get("email"),
        password: f.get("password"),
      });
      if (validated.error) {
        onWarn("Invalid credentials.");
        setLoading(false);
        return;
      }

      const { email, password } = validated.data;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      ).catch(Err(setLoading, "Invalid Credentials"));
      const u = userCredential?.user;
      if (u) {
        setUser(u);
        await createLog(u.uid, "login");
        const idToken = await u.getIdToken();
        await setIdToken(idToken)
        await setUID(u.uid)
        onSuccess("Logged in!");
      }
    },
    [createLog],
  );

  const signWithGoogle = useCallback(async () => {
    setGoogleSigning(true);
    const provider = new GoogleAuthProvider();
    const creds = await signInWithPopup(auth, provider);
    const u = creds?.user;
    if (u) {
      setUser(u);
      await createLog(u.uid, "login");
      rte.push("/dashboard");
      // await verify(u)
      //   .then(() => {
      //     rte.push("/dashboard");
      //   })
      //   .catch((e: Error) => {
      //     console.log(e);
      //     setGoogleSigning(false);
      //   });
      setGoogleSigning(false);
    }
    const oauthCredential = GoogleAuthProvider.credentialFromResult(creds);
    setOAuth(oauthCredential);
    setGoogleSigning(false);
  }, [createLog, rte]);

  const activateFn = useCallback(
    async (hcode: string) => {
      if (!user) {
        onWarn("You need to re-authenticate.");
        return null;
      }
      const id_token = await user.getIdToken();
      if (!id_token){
        onError("Unauthorized")
        return null
      }

      const storedValue = await activationGet({ key: `ACT•${hcode}`, path: "$" }) as ActivationSet[] | null

      if (!storedValue) {
        onError("Activation code not found");
        return null;
      }

      return storedValue[0]?.value?.group ?? null

    },
    [user],
  );

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
      signupUserWithEmail,
      setClaims,
      vresult,
      loading,
      vxuser,
      activateFn,
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
      signupUserWithEmail,
      setClaims,
      vresult,
      loading,
      vxuser,
      activateFn,
    ],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
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
