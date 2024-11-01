// import { getHCode, setHCode } from "@/app/actions";
import { onError, onSuccess } from "@/app/ctx/toasts";
import { type RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useCallback, useState } from "react";
import { verifyAgentCode } from "../secure/callers";
import type { HCodeResponse, HCodeParams } from "../secure/resource";
import { rawUriDecoder } from "@/utils/helpers";
import type { HCodeContentProps } from "@/app/hcode/content";

export const useHCode = () => {
  const [loading, setLoading] = useState(true);
  const [hcode] = useState<RequestCookie | undefined>();
  const [response, setResponse] = useState<HCodeResponse | undefined>();

  const decodeParams = useCallback((params: HCodeContentProps) => {
    const decoded = rawUriDecoder<HCodeContentProps>(params);
    const payload = {} as HCodeContentProps;
    decoded.forEach((i) => {
      Object.assign(payload, { ...i });
    });

    return payload;
  }, []);

  const verifyHCode = useCallback(async (params: HCodeParams) => {
    setLoading(true);
    const result = await verifyAgentCode(params);
    setResponse(result.data);
    if (result.data.verified) {
      onSuccess("Verified Agent Code");
      console.log(result.data.expiry);
      console.log(Date.now() + (result.data.expiry ?? 0));
      console.log();
      return setLoading(false);
    }
    onError("Verification Failed");
    setLoading(false);
  }, []);

  // const setHCodeCookie = useCallback(async (key: string) => {
  //   const hcode = await setHCode(key);
  //   onSuccess(hcode);
  //   setLoading(false);
  // }, []);

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
    // setHCodeCookie,
    // getHCodeCookie,
  };
};
