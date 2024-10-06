"use client";

import { auth } from "@/lib/auth";
import { type SignInWithEmailAndPassword } from "@/lib/auth/resource";
import { useSignIn } from "@/lib/auth/useSignIn";
import { useSignOut } from "@/lib/auth/useSignOut";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

interface AuthCtxValues {
  user: User | null;
  loading: boolean;
  signWithEmail: (params: SignInWithEmailAndPassword) => Promise<void>;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}
const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const { signWithEmail, signWithGoogle, loading } = useSignIn();
  const { signOut } = useSignOut();

  useEffect(() => {
    const authState = () => {
      onAuthStateChanged(auth, (current) => {
        setUser(current);
        if (current) {
          router.push(`/authed/${current.uid}`);
        }
        if (!current) router.replace(`/`);
      });
    };
    return () => {
      authState();
    };
  }, [router]);

  // Use useMemo to ensure stableUser is only recreated when user changes
  const stableValues = useMemo(
    () => ({
      user: user ?? null,
      loading,
      signWithEmail,
      signWithGoogle,
      signOut,
    }),
    [user, loading, signWithEmail, signWithGoogle, signOut],
  );

  return <AuthCtx.Provider value={stableValues}>{children}</AuthCtx.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error("User context is null");
  return context;
};
