"use client";
// import { useEffect } from "react";
// import { useHCode } from "./useHCode";

import { useHCode } from "@/lib/hooks/useHCode";
import { Button, Image, Input } from "@nextui-org/react";

import { useCallback, useMemo } from "react";
import { useThemeCtx } from "../ctx/theme";
import moment from "moment";
import { HCodeDetails } from "./hcode-details";
import { ShieldCheck } from "lucide-react";

export interface HCodeContentProps {
  code?: string;
  grp?: string;
  nonce?: string;
  sha?: string;
}
export const HCodeContent = (params: HCodeContentProps) => {
  const { theme } = useThemeCtx();
  const { decodeParams, verifyHCode, response } = useHCode();

  const decoded = useMemo(() => decodeParams(params), [decodeParams, params]);

  const handleVerify = useCallback(async () => {
    await verifyHCode({ key_code: "", ...decoded });
  }, [verifyHCode, decoded]);

  const valid_until = moment().from(Date.now() + (response?.expiry ?? 0));

  return (
    <main className="h-screen bg-background">
      <Header theme={theme} />
      <div className="p-10">
        <header className="flex items-center space-x-2 text-foreground/70">
          <ShieldCheck className="size-7 stroke-1 text-foreground" />
          <span className="text-2xl font-semibold text-foreground">
            Account Activation
          </span>
        </header>
      </div>
      <div className="mx-10 grid grid-cols-1 gap-8 rounded-3xl md:grid-cols-8">
        <div className="col-span-4 flex w-full flex-col items-start justify-start">
          <div className="flex w-full rounded-t-sm border-[0.33px] border-foreground/90 bg-foreground/80 p-3 font-inst text-sm font-semibold text-background">
            <header>Activation Status</header>
          </div>
          <HCodeDetails
            {...decoded}
            expiry={response?.expiry ? valid_until : "Expired"}
          />
        </div>
        <div className="col-span-2 flex h-full w-full flex-col space-y-4 rounded-lg border-[0.33px] border-foreground/50 p-6">
          <header className="text-foreground/80">
            Enter your activation code:
          </header>
          <div className="flex w-full flex-col space-y-6 py-8">
            <Input size="lg" />
            <Button
              variant="shadow"
              color="primary"
              size="lg"
              onPress={handleVerify}
            >
              Verify
            </Button>
            <Button
              variant="flat"
              color="default"
              onPress={handleVerify}
              size="lg"
              disabled
              className="opacity-50"
            >
              Activate
            </Button>
          </div>
        </div>
        <div className="spaece-x-4 col-span-2 flex h-full w-full rounded-lg border-[0.33px] border-foreground/50 p-6">
          <Image alt="branch-logo" src="svg/f.svg" />
        </div>
      </div>
    </main>
  );
};

const Header = (props: { theme: string }) => (
  <div className="flex h-[calc(100vh*0.1)] w-full items-center space-x-4 border-b-[0.33px] border-foreground/60 pl-6 md:pl-14 xl:pl-20">
    <div className="flex size-[24px] items-center justify-center rounded-full border-1 border-primary/40 xl:size-[32px]">
      <Image
        alt=""
        src={props.theme === "light" ? "/svg/logo_dark.svg" : "/svg/f.svg"}
        className="size-[12px] rounded-none xl:size-[16px]"
      />
    </div>
    <h1 className="font-inst font-medium text-foreground drop-shadow-lg dark:text-foreground/60 xl:text-lg">
      FastInsure Technologies
    </h1>
  </div>
);
