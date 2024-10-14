import { useCallback, useEffect, useState } from "react";
import { setAuthKeyCookie, verifyIdToken } from "../secure/callers";
import { type User } from "firebase/auth";
import { errHandler, settle } from "@/utils/helpers";
import { type AuthVerification } from "../secure/resource";
import { getAuthKey } from "@/app/actions";
import { verifyAuthKey } from "../secure/handlers";

export const useRUSecure = (user: User | null) => {
  const [serverified, setServerified] = useState<AuthVerification>();
  const [pending, setPending] = useState(false);

  const verifyIdTokenFn = useCallback(async () => {
    if (!user) return;
    const idToken = await user.getIdToken();
    const uid = user.uid;
    const email = user.email;
    const authKey = await getAuthKey("fastinsure--auth-key");
    console.log(authKey);
    if (!authKey) {
      return await verifyIdToken({ idToken, uid, email });
    }
    return await verifyAuthKey({ idToken, uid, email, authKey });
  }, [user]);

  useEffect(() => {
    setPending(true);
    verifyIdTokenFn()
      .then((status) => {
        setServerified(status);
        if (!status?.key) return;
        setAuthKeyCookie(status.key).catch(console.log);
      })
      .catch(errHandler(setPending))
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
