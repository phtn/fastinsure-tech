import { useRouter } from "next/navigation";
import { guid } from "@/utils/helpers";
import { useCallback, useState } from "react";

export const useRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // router.prefetch(`/dashboard/requests/create/${requestId}`);

  const request = useCallback(() => {
    setLoading(true);
    const request_id = guid();
    router.push(`/dashboard/request/create?rid=${request_id}`);
    setLoading(false);
  }, [router]);
  return { loading, request };
};
