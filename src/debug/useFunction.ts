import { getLastLogin, getUID } from "@/app/actions";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { onWarn } from "@/app/ctx/toasts";
import { useNav } from "@/app/dashboard/hooks/useNav";
import type { DualIcon } from "@/app/types";
import { verifyUser } from "@/trpc/secure/callers/auth";
import { getLivez } from "@/trpc/secure/callers/server";
import {
  type UserVerificationResponse,
  type LivezResponse,
} from "@/server/secure/resource";
import { type NavItem } from "@/ui/sidebar";
import type { SelectUser, UserRole } from "@convex/users/d";
import { CircleStackIcon, ClockIcon } from "@heroicons/react/24/outline";
import { IdentificationIcon } from "@heroicons/react/24/solid";
import { type ParsedToken } from "firebase/auth";
import { ServerIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  type Dispatch,
  type SetStateAction,
  type TransitionStartFunction,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";

export interface TestFunction {
  id: number;
  name: string;
  description?: string;
  icon: DualIcon;
  fn: VoidFunction;
  result?: string | number | boolean | object | null | undefined;
  returnType?: string;
}

interface UserInitValues {
  navs: NavItem[] | undefined;
  claims: UserRole[] | null;
}

export const useFunction = () => {
  const { navs } = useNav();
  const { user, claims } = useAuthCtx();
  const { usr } = useVex();
  const [livez, setLivez] = useState<LivezResponse | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [parsedToken, setParsedToken] = useState<ParsedToken>();
  const [userInitValues, setUserInitValues] = useState<UserInitValues | null>(
    null,
  );
  const [vxUser, setVxUser] = useState<SelectUser | null>(null);
  const [vres, setVRes] = useState<UserVerificationResponse>();
  const [lastLogin, setLastLogin] = useState(0);

  const [pending, func] = useTransition();
  const router = useRouter();

  const updateFnList = () => {
    router.push("/sandbox");
  };

  const startFn = <T>(
    transition: TransitionStartFunction,
    fn: () => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    transition(() => {
      transition(async () => {
        const result = await fn();
        if (!result) {
          onWarn(`return-type: ${String(result)}`);
        }
        set(result);
      });
    });
  };

  const getUserInitValues = useCallback(() => {
    setUserInitValues({ navs, claims });
  }, [navs, claims]);

  const fn_getUID = useCallback(() => {
    startFn(func, getUID, setUid);
  }, []);

  const fn_parsedToken = useCallback(() => {
    const getParsed = async () =>
      user ? (await user.getIdTokenResult()).claims : undefined;
    startFn(func, getParsed, setParsedToken);
  }, [user]);

  const fn_getVxUser = useCallback(async () => {
    if (user?.uid) {
      const vx = await usr.get.byId(user.uid);
      setVxUser(vx);
    }
  }, [usr.get, user?.uid]);

  const verifyWithUID = useCallback(async () => {
    if (user) {
      const uid = user.uid;
      const id_token = await user.getIdToken();
      const refresh_token = (await user.getIdTokenResult()).token;
      const r = await verifyUser({ uid, id_token, refresh_token });
      return r.data;
    }
  }, [user]);

  const fn_verifyUser = useCallback(() => {
    startFn(func, verifyWithUID, setVRes);
  }, [verifyWithUID]);

  const checkLastLogin = useCallback(async () => {
    const lastLogin = await getLastLogin();
    // if (!lastLogin) {
    //   await setLastLogin();
    //   return `Logged out: ${new Date().getTime()}`;
    // }
    // return moment().from(lastLogin);
    return Number(lastLogin);
  }, []);

  const fn_getLastLogin = useCallback(() => {
    startFn(func, checkLastLogin, setLastLogin);
  }, [checkLastLogin]);

  //////////////////////////////////////////////////////////////////////
  //SERVER

  const fn_getLivez = useCallback(() => {
    startFn(func, getLivez, setLivez);
  }, []);

  const devFnList: TestFunction[] = useMemo(
    () => [
      {
        id: 0,
        name: "Get User Inital Values",
        description: "Expected values in user context.",
        icon: IdentificationIcon,
        fn: getUserInitValues,
        result: userInitValues,
        returnType: "object<navs, claims,...>",
      },
      {
        id: 1,
        name: "Get Livez (Server)",
        description: "re-up.ph secure server",
        icon: ServerIcon,
        fn: fn_getLivez,
        result: livez,
        returnType: "object<Status, Data,..>",
      },
      {
        id: 2,
        name: "Get UID (Cookies)",
        description: "Verify if UID is stored in cookies. ",
        icon: IdentificationIcon,
        fn: fn_getUID,
        result: uid,
        returnType: "<string | undefined>",
      },
      {
        id: 3,
        name: "Get Claims (Firebase)",
        description: "Custom claims from getIdTokenResult()",
        icon: IdentificationIcon,
        fn: fn_parsedToken,
        result: parsedToken,
        returnType: "<ParsedToken | undefined>",
      },
      {
        id: 4,
        name: "Get User (Convex)",
        description: "getById query",
        icon: IdentificationIcon,
        fn: fn_getVxUser,
        result: vxUser,
        returnType: "<SelectUser | undefined>",
      },
      {
        id: 5,
        name: "Verify User (Server)",
        description: "{claims, uid, verified}",
        icon: CircleStackIcon,
        fn: fn_verifyUser,
        result: vres,
        returnType: "<UserVerificationResponse | undefined>",
      },
      {
        id: 6,
        name: "Get Last Login (Cookies)",
        description: "Last login in (ms)",
        icon: ClockIcon,
        fn: fn_getLastLogin,
        result: lastLogin,
        returnType: "<number>",
      },
    ],
    [
      uid,
      fn_getUID,
      fn_parsedToken,
      parsedToken,
      userInitValues,
      getUserInitValues,
      fn_getLivez,
      fn_verifyUser,
      livez,
      fn_getVxUser,
      vxUser,
      vres,
      lastLogin,
      fn_getLastLogin,
    ],
  );
  return { devFnList, pending, updateFnList };
};
