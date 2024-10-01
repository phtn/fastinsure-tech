import { auth } from "@/lib/db";
import { useAuthState } from "@/lib/auth/useAuthState";
import { type User } from "firebase/auth";
import { createContext, useContext, type PropsWithChildren } from "react";

interface AuthCtxValues {
  user: User | null;
}
const AuthCtx = createContext<AuthCtxValues | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthState(auth);
  return <AuthCtx.Provider value={{ user }}>{children}</AuthCtx.Provider>;
};

export const useAuthCtx = () => {
  const context = useContext(AuthCtx);
  if (!context) throw new Error();
  return context;
};
