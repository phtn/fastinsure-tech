import { signOut as logout } from "firebase/auth";
import { auth } from ".";
import { useState } from "react";

export const useSignOut = () => {
  const [loading, setLoading] = useState(false);
  const signOut = async () => {
    setLoading(true);
    await logout(auth)
      .then(() => {
        setLoading(false);
      })
      .catch(console.error);
  };
  return { signOut, loading };
};
