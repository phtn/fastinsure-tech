import { getHCode, setHCode } from "@/app/actions";
import { onSuccess } from "@/app/ctx/toasts";
import { type RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useCallback, useState } from "react";

export const useHCode = () => {
  const [loading, setLoading] = useState(true);
  const [hcode, setHCodeState] = useState<RequestCookie | undefined>();

  const setHCodeCookie = useCallback(async (key: string) => {
    const hcode = await setHCode(key);
    onSuccess(hcode);
    setLoading(false);
  }, []);

  const getHCodeCookie = async () => {
    const hcode = await getHCode();
    setHCodeState(hcode);
  };

  return {
    hcode,
    loading,
    setHCodeCookie,
    getHCodeCookie,
  };
};
