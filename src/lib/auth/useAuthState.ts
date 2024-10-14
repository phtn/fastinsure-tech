import { errHandler } from "@/utils/helpers";
import { type User, onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { auth } from ".";
import { getAuthKey } from "@/app/actions";

type AuthStateOptions = {
  onUserChanged?: (user: User | null) => Promise<void>;
};

export const useAuthState = (options?: AuthStateOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authKey, setAuthKeyState] = useState<string>();

  useEffect(() => {
    getAuthKey().then(setAuthKeyState).catch(console.log);
  }, []);

  useEffect(() => {
    // const onRefresh = useCallback(() => {
    //   setAuthKeyState(getAuthKey())
    // }, deps);

    setLoading(true);
    const unsub = onAuthStateChanged(auth, (current) => {
      const handleUserChange = () => {
        if (options?.onUserChanged) {
          options
            .onUserChanged(current)
            .then(() => {
              setUser(current);
            })
            .catch(errHandler(setLoading, setError));
        }
        setUser(current);
        setLoading(false);
      };
      handleUserChange();
    });

    return () => {
      unsub();
    };
  }, [options]);

  return {
    user,
    loading,
    error,
    authKey,
  };
};
