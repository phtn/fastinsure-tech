import { setCustomClaims, setIdToken, setRefresh, setUID } from "@/app/actions";
import type { OnSigninVerification } from "@/server/secure/resource";
import { verifyOnSignin } from "@/trpc/secure/callers/auth";
import type { UserRole } from "@convex/users/d";
import type { IdTokenResult, ParsedToken, User } from "firebase/auth";
import type { Dispatch, SetStateAction } from "react";

export const initVerification = async (
  u: User,
  setUserRecord: Dispatch<SetStateAction<IdTokenResult | null>>,
  setClaims: Dispatch<SetStateAction<UserRole[] | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => {
  //
  const id_token = await u.getIdToken();
  const refresh_token = (await u.getIdTokenResult()).token;
  //
  const parsedToken = (await u.getIdTokenResult()).claims;
  const customClaims = filterActiveClaims(parsedToken);
  const activeClaims = customClaims?.join(",") ?? "";
  setClaims(customClaims);
  //
  const record = await u.getIdTokenResult();
  setUserRecord(record);
  //
  await setUID(u.uid);
  await setIdToken(id_token);
  await setRefresh(refresh_token);
  await setCustomClaims(activeClaims);
  //
  const vParams: OnSigninVerification = {
    uid: u.uid,
    id_token,
    refresh_token,
  };
  //
  const r = await verifyOnSignin(vParams);
  setLoading(false);
  return r;
};

export const filterActiveClaims = (customClaims: ParsedToken) => {
  if (!customClaims) return null;
  const allowedRoles = [
    "admin",
    "manager",
    "agent",
    "agent2",
    "supervisor",
    "underwriter",
  ];

  return Object.entries(customClaims)
    .filter(([key, value]) => value && allowedRoles.includes(key))
    .map(([key]) => key as UserRole);
};
