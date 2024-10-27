import { useCallback, useEffect, useState } from "react";
import { getClaims } from "../secure/callers";
import { useAuthCtx } from "@/app/ctx/auth";
import { errHandler } from "@/utils/helpers";

type Claim = Record<string, boolean>;

export const useClaims = () => {
  const { user } = useAuthCtx();
  const [claims, setClaims] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchClaims = useCallback(async () => {
    if (user) {
      const id_token = await user.getIdToken();
      const c = await getClaims({
        uid: user.uid,
        email: user.email,
        id_token,
      });
      setClaims(getActiveClaims(c.data as Claim));
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchClaims().catch(errHandler(setLoading, "Failed to fetch claims"));
  }, [fetchClaims]);

  return {
    claims,
    loading,
  };
};

function getActiveClaims(claims: Claim) {
  const result = new Set<string>();
  for (const [k, v] of Object.entries(claims)) {
    if (v) {
      result.add(k);
    }
  }

  return Array.from(result);
}
