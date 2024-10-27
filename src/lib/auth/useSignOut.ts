import { signOut as logout } from "firebase/auth";
import { auth } from ".";
import { useState } from "react";
import { onSuccess } from "@/app/ctx/toasts";

export const useSignOut = () => {
  const [loading, setLoading] = useState(false);
  const signOut = async () => {
    setLoading(true);
    await logout(auth)
      .then(() => {
        onSuccess("Signed out successfully.");
        setLoading(false);
      })
      .catch(console.error);
  };
  return { signOut, loading };
};
