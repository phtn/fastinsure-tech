import { errHandler } from "@/utils/helpers";
import { type Auth, type User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

type AuthStateOptions = {
  onUserChanged?: (user: User | null) => Promise<void>;
};

export const useAuthState = (auth: Auth, options?: AuthStateOptions) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    setLoading(true);
    const session = onAuthStateChanged(auth, (current) => {
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
      session();
    };
  }, [auth, options]);

  return {
    user,
    loading,
    error,
  };
};
