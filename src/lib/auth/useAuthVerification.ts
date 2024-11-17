import { useCallback, useEffect, useState } from "react";
import { verifyIdToken } from "../secure/callers";
import { type User } from "firebase/auth";
import { Err, settle } from "@/utils/helpers";
import { type AuthVerification } from "../secure/resource";

export const useAuthVerification = (user: User | null) => {
  const [serverified, setServerified] = useState<{
    data: AuthVerification;
  } | null>(null);
  const [pending, setPending] = useState(false);

  const verifyIdTokenFn = useCallback(async () => {
    if (!user) return;
    const id_token = await user.getIdToken();
    const uid = user.uid;
    const email = user.email;
    return await verifyIdToken({ id_token, uid, email });
  }, [user]);

  useEffect(() => {
    setPending(true);
    verifyIdTokenFn()
      .then((data) => {
        if (!data) return;
        setServerified({ ...data });
      })
      .catch(Err(setPending))
      .finally(settle(setPending));
  }, [verifyIdTokenFn]);

  return {
    serverified,
    pending,
  };
  // const withAuthKey = await getAuthKey();

  // if (!withAuthKey) {
  //   await verifyIdToken({ idToken })
  //     .then((key) => {
  //       setAuthKey(JSON.stringify(key)).then(console.log).catch(console.log);
  //     })
  //     .catch(console.log);
  // }
};
