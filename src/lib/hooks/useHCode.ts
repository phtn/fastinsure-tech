// import { getHCode, setHCode } from "@/app/actions";
import { onError, onSuccess } from "@/app/ctx/toasts";
import { type RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useCallback, useState } from "react";
import { verifyAgentCode } from "../secure/callers";
import type { HCodeResponse, HCodeParams } from "../secure/resource";
import { Err, rawUriDecoder } from "@/utils/helpers";
import type { HCodeContentProps } from "@/app/hcode/content";
import { setHCode } from "@/app/actions";

export const useHCode = () => {
  const [loading, setLoading] = useState(true);
  const [hcode] = useState<RequestCookie | undefined>();
  const [response, setResponse] = useState<HCodeResponse | undefined>();
  const [allChecked, setAllChecked] = useState(false);

  const decodeParams = useCallback((params: HCodeContentProps) => {
    const decoded = rawUriDecoder<HCodeContentProps>(params);
    const payload = {} as HCodeContentProps;
    decoded.forEach((i) => {
      Object.assign(payload, { ...i });
    });

    return payload;
  }, []);

  const setHCodeCookie = useCallback(
    async (key: string) => await setHCode(key),
    [],
  );

  const verifyHCode = useCallback(
    async (params: HCodeParams) => {
      setLoading(true);
      const result = await verifyAgentCode(params);
      if (result.data) {
        setResponse(result.data);
      }
      if (result.data.verified) {
        onSuccess("Verified Agent Code");
        // console.log(result.data);
        console.log(`${params.key_code}--${result.data.group_code}`);
        return setHCodeCookie(
          `${params.key_code}--${result.data.group_code}`,
        ).catch(Err(setLoading, "Unable to save cookie"));
      }
      onError("Verification Failed");
      setLoading(false);
    },
    [setHCodeCookie],
  );

  const checkStatuses = useCallback((acc_statuses: boolean) => {
    if (!acc_statuses) {
      setAllChecked(true);
    }
  }, []);

  // const getHCodeCookie = async () => {
  //   const hcode = await getHCode();
  //   setHCodeState(hcode);
  // };

  return {
    hcode,
    loading,
    verifyHCode,
    response,
    decodeParams,
    checkStatuses,
    allChecked,
    // setHCodeCookie,
    // getHCodeCookie,
  };
};
