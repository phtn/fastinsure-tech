"use client";

import { useHCode } from "@/lib/hooks/useHCode";
import { Button, Image, Input } from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
import { useThemeCtx } from "../ctx/theme";
import moment from "moment";
import { HCodeDetails } from "./hcode-details";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { verifyHCode } from "../actions";
import type { HCodeParams, HCodeResponse } from "@/lib/secure/resource";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export interface HCodeContentProps {
  code: string | undefined;
  grp: string | undefined;
  nonce: string | undefined;
  sha: string | undefined;
}
export const HCodeContent = (params: HCodeContentProps) => {
  const { theme } = useThemeCtx();
  const { decodeParams } = useHCode();

  const [verified, setVerified] = useState<boolean | undefined>();
  const [expiry, setExpiry] = useState<number | undefined>();

  const decoded = useMemo(
    () => decodeParams(params),
    [decodeParams, params],
  ) as HCodeParams;

  const handleVerify = useCallback(
    async (formData: FormData) => {
      // idbwxr
      const response = (await verifyHCode(decoded, formData)) as HCodeResponse;
      setVerified(response?.verified);
      setExpiry(response?.expiry);
    },
    [decoded],
  );
  const expiry_date = Date.now() + (expiry ?? 0);

  const valid_until = moment(expiry_date).fromNow();

  const router = useRouter();
  const handleActivate = useCallback(() => {
    router.push("/signin");
  }, [router]);

  // XGNOTP
  // http://localhost:3000/hcode?code=dsbe0xb4baab53d3&grp=tdJ2wJNNpnQIAiS+dNJGZyYqszatqVPQSX0dCpYSPBo=&nonce=21&sha=lPewWBRb5DmkfA+NadWubOcj

  return (
    <main className="h-screen bg-background">
      <Header theme={theme} />
      <div className="p-10">
        <header className="flex items-center space-x-2 text-foreground/70">
          <ShieldCheck className="size-7 fill-foreground stroke-1 text-background" />
          <span className="text-2xl font-semibold tracking-tight text-foreground">
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
            expiry={expiry ? valid_until : undefined}
            verified={verified ?? null}
          />
        </div>
        <div className="col-span-2 flex h-full w-full flex-col space-y-4 rounded-lg border-[0.33px] border-primary-300 p-6">
          <header className="flex justify-center">
            {verified ? (
              <span className="font-semibold text-foreground">
                Verification Successful!
              </span>
            ) : (
              <span className="text-foreground/80">
                Enter your activation code:
              </span>
            )}
          </header>
          <div className="flex w-full flex-col">
            <form
              action={handleVerify}
              className="flex w-full flex-col space-y-5 py-6"
            >
              <Input
                size="lg"
                name="key_code"
                className="rounded-md border border-dashed border-primary-300 bg-primary-100/20 font-bold tracking-[1rem] text-foreground/80"
                classNames={{
                  input: "text-center uppercase",
                }}
              />
              <Button
                variant={verified ? "flat" : "solid"}
                color={verified ? "default" : "primary"}
                radius="sm"
                type="submit"
                className={cn(
                  "flex w-full items-center space-x-2 transition-all duration-500 ease-out",
                  { "bg-transparent": verified },
                )}
                disabled={verified}
                size={verified ? "md" : "lg"}
              >
                {verified ? "Verified" : "Verify"}
                {verified ? (
                  <CheckIcon className="size-5 text-success-600" />
                ) : null}
              </Button>
            </form>
            <div className="flex w-full flex-col items-center space-y-6">
              <Button
                variant={verified ? "shadow" : "flat"}
                color={verified ? "primary" : "default"}
                onPress={handleActivate}
                disabled={!verified}
                className={cn("w-fit rounded-full font-medium", {
                  "bg-transparent opacity-30": !verified,
                  "animate-enter": verified,
                })}
                size={!verified ? "md" : "lg"}
              >
                <div className="pr-4">Activate your account</div>
                <div className="-mr-3.5 flex size-8 items-center justify-center rounded-full bg-background">
                  <ChevronRightIcon className="size-3 text-foreground" />
                </div>
              </Button>
              <div
                className={cn("rounded-xl bg-foreground/5 px-4 py-2 text-xs", {
                  hidden: !verified,
                  "animate-enter delay-700": verified,
                })}
              >
                <span className="px-2 text-foreground/80">Next step:</span>
                Account creation
              </div>
            </div>
          </div>
        </div>
        <div className="spaece-x-4 col-span-2 flex h-full w-full rounded-lg border-[0.33px] border-primary-300 p-6">
          <Image alt="branch-logo" src="svg/f.svg" />
        </div>
      </div>
    </main>
  );
};

const Header = (props: { theme: string }) => (
  <div className="flex h-[calc(100vh*0.1)] w-full items-center space-x-4 border-b-[0.33px] border-foreground/20 pl-6 md:pl-10">
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
