import { guid } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useRequest = () => {
  const router = useRouter();

  const create = useCallback(() => {
    const request_id = guid();
    router.push(`/dashboard/request/create?rid=${request_id}`);
  }, [router]);

  return { create };
};
