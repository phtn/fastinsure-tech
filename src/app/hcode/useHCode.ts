import { onError, onSuccess } from "@/app/ctx/toasts";
import { type RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useCallback, useMemo, useState } from "react";
import { Err, rawUriDecoder } from "@/utils/helpers";
import { setGroupCode, setHCode } from "@/app/actions";
import type {
  HCode,
  HCodeParams,
  HCodeResponse,
} from "@/server/secure/resource";
import { verifyCode } from "@/trpc/secure/callers/agent";
import moment from "moment";

export const useHCode = (sp: HCode & { exp: string | null }) => {
  const [loading, setLoading] = useState(true);
  const [hcodeCookie] = useState<RequestCookie | undefined>();
  const [response, setResponse] = useState<HCodeResponse | undefined>();
  const [allChecked, setAllChecked] = useState(false);

  const getExp = useCallback(() => {
    const expiry_date = sp?.exp ? Number(sp?.exp.replaceAll("$", "")) : 0;
    const valid_until = moment(expiry_date).fromNow();
    return valid_until;
  }, [sp?.exp]);

  const exp = useMemo(() => getExp(), [getExp]);

  const decodeParams = useCallback(() => {
    const decoded = rawUriDecoder<HCode>(sp);
    const payload = {} as HCode;
    decoded.forEach((i) => {
      Object.assign(payload, { ...i });
    });
    return payload;
  }, [sp]);

  const hcode = useMemo(() => decodeParams(), [decodeParams]);

  // useEffect(() => {
  //   console.log("hcode", hcode);
  // }, [hcode]);

  const setHCodeCookie = useCallback(
    async (key: string) => await setHCode(key),
    [],
  );

  const setGroup = useCallback(async (group_code: string) => {
    await setGroupCode(group_code);
  }, []);

  const verifyHCode = useCallback(
    async (params: HCodeParams) => {
      setLoading(true);
      await verifyCode(params)
        .then((res) => {
          // console.log(res);
          if (res && res.Status === 200) {
            setResponse(res);
            if (res.Data.verified) {
              onSuccess("Verified Agent Code");

              // console.log("useHCode", `${params.code}--${res.Data.group_code}`);

              return setHCodeCookie(
                `${params.code}--${res.Data.group_code}`,
              ).catch(Err(setLoading, "Unable to save cookie"));
            } else {
              return onError("Activation code is invalid.");
            }
          }
        })
        .catch(Err(setLoading, "Verification failed"));
    },
    [setHCodeCookie],
  );

  const getStatus = useCallback((acc_statuses: boolean) => {
    if (!acc_statuses) {
      setAllChecked(true);
    }
  }, []);

  // const getHCodeCookie = async () => {
  //   const hcode = await getHCode();
  //   setHCodeState(hcode);
  // };

  return {
    hcodeCookie,
    loading,
    verifyHCode,
    response,
    decodeParams,
    getStatus,
    setGroup,
    allChecked,
    hcode,
    exp,
    // setHCodeCookie,
    // getHCodeCookie,
  };
};
