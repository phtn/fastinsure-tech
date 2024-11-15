// import { useCallback, useEffect, useMemo, useState } from "react";
// import { getClaims } from "../secure/callers";
// import { useAuthCtx } from "@/app/ctx/auth";
// import { errHandler } from "@/utils/helpers";

// type Claim = Record<string, boolean> | null;

// export const useClaims = () => {
//   const { user } = useAuthCtx();
//   const [claims, setClaims] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   const filterActiveClaims = useCallback(
//     (claims: Record<string, boolean> | null) => {
//       if (!claims) return [];

//       return Object.entries(claims)
//         .filter(([_, v]) => v)
//         .map(([k]) => k);
//     },
//     [],
//   );

//   const fetchClaims = useCallback(async () => {
//     if (user) {
//       const id_token = await user.getIdToken();
//       const c = await getClaims({
//         uid: user.uid,
//         email: user.email,
//         id_token,
//       });
//       setClaims(getActiveClaims(c.data.CustomClaims) ?? []);
//       setLoading(false);
//     }
//   }, [user]);

//   return {
//     claims,
//     loading,
//     setClaims,
//     filterActiveClaims,
//   };
// };

// function getActiveClaims(claims: Claim) {
//   const result = new Set<string>();
//   if (!claims) return;
//   for (const [k, v] of Object.entries(claims)) {
//     if (v) {
//       result.add(k);
//     }
//   }
//   return Array.from(result);
// }
