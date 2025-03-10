import { useRouter } from "next/navigation";
import { guid } from "@/utils/helpers";
import { useCallback, useState } from "react";

export const useRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const request = useCallback(() => {
    setLoading(true);
    const request_id = guid();
    console.log(`/dashboard/request/create?rid=${request_id}`)
    router.push(`/dashboard/request/create?rid=${request_id}`);
    setLoading(false);
  }, [router]);
  return { loading, request };
};
