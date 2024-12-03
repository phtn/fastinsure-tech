"use client";

import { Button, Image, Input } from "@nextui-org/react";
import { useActionState, useCallback, useEffect, useState } from "react";
import { HCodeDetails } from "./hcode-details";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { verifyHCode } from "../actions";
import type { HCode, HCodeResponseData } from "@/lib/secure/resource";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useHCode } from "./useHCode";
import { Err, opts } from "@/utils/helpers";

const getKeys = (s: ReadonlyURLSearchParams, ...args: string[]) => {
  const store = {};
  const searchKeys = args.reduce(
    (_, cur) => Object.assign(store, { [cur]: s.get(cur) }),
    {} as Record<string, string | null>,
  );
  return searchKeys;
};

export const HCodeContent = () => {
  const sp = useSearchParams();
  // const hkey = searchParams.get("code");
  // const grp = searchParams.get("grp");
  // const nonce = searchParams.get("nonce");
  // const sha = searchParams.get("sha");
  // const exp = searchParams.get("exp");

  const searchParams = getKeys(
    sp,
    "hkey",
    "grp",
    "nonce",
    "sha",
    "exp",
  ) as HCode & { exp: string | null };

  const { hcode, exp, setGroup } = useHCode(searchParams);

  const [vres] = useState<HCodeResponseData>();

  const [data, action, pending] = useActionState(verifyHCode, vres);

  const router = useRouter();
  const handleActivate = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (data?.verified && data?.group_code) {
      setGroup(data.group_code).catch(Err);
    }
  }, [data, setGroup]);

  // XGNOTP
  // http://localhost:3000/hcode?code=dsbe0xb4baab53d3&grp=tdJ2wJNNpnQIAiS+dNJGZyYqszatqVPQSX0dCpYSPBo=&nonce=21&sha=lPewWBRb5DmkfA+NadWubOcj
  //
  const VerifyButton = useCallback(() => {
    const options = opts(
      <Button
        variant={"flat"}
        color={"default"}
        radius="sm"
        type="submit"
        isLoading={pending}
        className={cn(
          "flex w-full items-center space-x-2 bg-transparent transition-all duration-500 ease-out",
        )}
        disabled
        size={"md"}
      >
        <span>Verified</span>
        <CheckIcon className="size-5 text-success-600" />
      </Button>,
      <Button
        variant={"solid"}
        color={"primary"}
        radius="sm"
        type="submit"
        disabled={exp.includes("ago")}
        isLoading={pending}
        className={cn(
          "flex w-full items-center space-x-2 transition-all duration-500 ease-out",
        )}
        size={"lg"}
      >
        <span>Verify</span>
      </Button>,
    );
    return <>{options.get(!!data?.verified)}</>;
  }, [data?.verified, pending, exp]);

  const ActivateButton = useCallback(() => {
    const options = opts(
      <Button
        variant={"shadow"}
        color={"primary"}
        onPress={handleActivate}
        className={cn("w-fit animate-enter rounded-full font-medium")}
        size={"lg"}
      >
        <div className="pr-4">Activate your account</div>
        <div className="-mr-3.5 flex size-8 items-center justify-center rounded-full bg-background">
          <ChevronRightIcon className="size-3 text-foreground" />
        </div>
      </Button>,
      <Button
        variant={"flat"}
        color={"default"}
        onPress={handleActivate}
        disabled={true}
        className={cn(
          "w-fit rounded-full bg-transparent font-medium opacity-30",
        )}
        size={"md"}
      >
        <div className="pr-4">Activate your account</div>
        <div className="-mr-3.5 flex size-8 items-center justify-center rounded-full bg-background">
          <ChevronRightIcon className="size-3 text-foreground" />
        </div>
      </Button>,
    );
    return <>{options.get(!!data?.verified)}</>;
  }, [data?.verified, handleActivate]);

  return (
    <main className="h-screen bg-background">
      <Header />
      <div className="p-10">
        <header className="flex items-center space-x-2 text-foreground/70">
          <ShieldCheck className="size-7 fill-foreground stroke-1 text-background" />
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            Account Activation
          </span>
        </header>
      </div>
      <div className="grid w-full grid-cols-1 border-y-2 border-primary-500 px-6 md:grid-cols-8">
        <div />
        <div className="col-span-2 flex w-full flex-col items-start justify-start border-l-[0.33px] border-foreground/90 border-primary-500">
          <div className="flex w-full bg-foreground/0 px-6 pt-4 font-inst text-sm font-semibold">
            <header>Activation Status</header>
          </div>
          <HCodeDetails hcode={hcode} expiry={exp} verified={data?.verified} />
        </div>
        <div className="col-span-2 flex h-full w-full flex-col space-y-4 border-x-[0.33px] border-primary-500 p-6">
          <header className="flex justify-center">
            {data?.verified ? (
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
              action={action}
              className="flex w-full flex-col space-y-5 py-6"
            >
              <Input
                size="lg"
                radius="lg"
                name="code"
                disabled={exp.includes("ago") || pending || data?.verified}
                required
                className="rounded-xl border border-dashed border-primary-500 bg-primary-100/20 font-bold tracking-[1rem] text-foreground/80"
                classNames={{
                  input: "text-center uppercase",
                }}
              />
              <input
                className="hidden"
                name="hkey"
                defaultValue={hcode?.hkey ?? ""}
              />
              <input
                className="hidden"
                name="grp"
                defaultValue={hcode?.grp ?? ""}
              />
              <input
                className="hidden"
                name="sha"
                defaultValue={hcode?.sha ?? ""}
              />
              <input
                className="hidden"
                name="nonce"
                defaultValue={hcode?.nonce ?? ""}
              />

              <VerifyButton />
            </form>
            <div className="flex w-full flex-col items-center space-y-6">
              <ActivateButton />
              <div
                className={cn(
                  "hidden rounded-xl bg-foreground/5 px-4 py-2 text-xs",
                  {
                    "animate-enter delay-700": !!data?.verified,
                  },
                )}
              >
                <span className="px-2 text-foreground/80">Next step:</span>
                Account creation
              </div>
            </div>
          </div>
        </div>
        <div className="spaece-x-4 col-span-2 flex h-full w-full border-r-[0.33px] border-primary-500 p-6">
          <Image alt="branch-logo" src="svg/f.svg" />
        </div>
        <div />
      </div>
    </main>
  );
};

const Header = () => (
  <div className="flex h-[calc(100vh*0.1)] w-full items-center space-x-4 border-b-[0.33px] border-foreground/20 pl-6 md:pl-10">
    <div className="flex size-[24px] items-center justify-center rounded-full border-1 border-primary-500 bg-primary/20 xl:size-[32px]">
      <Image
        alt=""
        src={"/svg/f.svg"}
        className="size-[12px] rounded-none xl:size-[16px]"
      />
    </div>
    <h1 className="font-inst font-medium text-foreground drop-shadow-lg dark:text-foreground/60 xl:text-lg">
      FastInsure Technologies
    </h1>
  </div>
);
