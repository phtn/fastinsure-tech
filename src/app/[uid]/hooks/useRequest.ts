import { useRouter } from "next/navigation";
import { guid } from "@/utils/helpers";
import { useCallback, useState } from "react";

export const useRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const requestId = guid();

  router.prefetch(`/dashboard/requests/create/${requestId}`);

  const createRequest = useCallback(() => {
    setLoading(true);
    router.push(`/dashboard/requests/create/${requestId}`);
  }, [requestId, router]);
  return { loading, createRequest };
};
