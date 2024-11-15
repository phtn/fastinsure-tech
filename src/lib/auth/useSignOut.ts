import { signOut as logout } from "firebase/auth";
import { auth } from ".";
import { useState } from "react";
import { onSuccess } from "@/app/ctx/toasts";
import { useRouter } from "next/navigation";
import { deleteRefresh, deleteSession, deleteUID } from "@/app/actions";

export const useSignOut = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const signOut = async () => {
    setLoading(true);

    await deleteSession();
    await deleteRefresh();
    await deleteUID();
    await logout(auth)
      .then(() => {
        onSuccess("Signed out successfully.");
        setLoading(false);
        router.push("/");
      })
      .catch(console.error);
  };
  return { signOut, loading };
};
