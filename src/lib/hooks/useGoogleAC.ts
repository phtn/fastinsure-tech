import { env } from "@/env";
import { GoogleAuth, type JWT } from "google-auth-library";
import { useCallback, useEffect, useState, useTransition } from "react";
import { documentai_v1 } from "googleapis";
import type { Dispatch, SetStateAction, TransitionStartFunction } from "react";

let authClientState: JWT | null = null;
let docaiClientState: documentai_v1.Documentai | null = null;

export const useGoogleAC = () => {
  const [authClient, setAuthClient] = useState<JWT | null>(authClientState);
  const [docaiClient, setDocaiClient] =
    useState<documentai_v1.Documentai | null>(docaiClientState);

  const getAuthClient = useCallback(async () => {
    if (authClientState) return authClientState;
    const scopes: string[] = ["https://www.googleapis.com/auth/cloud-platform"];
    const credentials = JSON.parse(env.ADC) as object;
    const auth = new GoogleAuth({
      credentials,
      scopes,
    });
    return (await auth.getClient()) as JWT | null;
  }, []);

  const getDocaiClient = useCallback(async () => {
    if (docaiClient) return docaiClient;
    if (authClient) {
      const dc = new documentai_v1.Documentai({
        auth: authClient,
      });
      return dc;
    } else {
      return null;
    }
  }, [authClient, docaiClient]);

  const [pending, fn] = useTransition();

  const setFn = <T>(
    xt: TransitionStartFunction,
    action: () => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    xt(() => {
      xt(async () => {
        const res = await action();
        set(res);
      });
    });
  };

  const getGoogleAuthClient = useCallback(() => {
    setFn(fn, getAuthClient, setAuthClient);
  }, [getAuthClient]);

  const getDocumentAi = useCallback(() => {
    setFn(fn, getDocaiClient, setDocaiClient);
  }, [getDocaiClient]);

  useEffect(() => {
    if (authClient) {
      authClientState = authClient;
    }
    if (docaiClient) {
      docaiClientState = docaiClient;
    }
  }, [authClient, docaiClient]);

  useEffect(() => {
    getGoogleAuthClient();
    getDocumentAi();
  }, [getGoogleAuthClient, getDocumentAi]);

  return { pending, authClient, docaiClient };
};
