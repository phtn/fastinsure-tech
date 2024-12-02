import { useAuthCtx } from "@/app/ctx/auth";
import { Err } from "@/utils/helpers";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { useCallback, type FormEvent } from "react";

export const GoogleSignin = () => {
  const { signWithGoogle, googleSigning } = useAuthCtx();
  const handleOnPress = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      signWithGoogle().catch(Err);
    },
    [signWithGoogle],
  );

  return (
    <div className="flex w-full">
      <Button
        size="lg"
        variant="flat"
        radius="sm"
        isLoading={googleSigning}
        onClick={handleOnPress}
        className="flex w-full border-[0.33px] border-primary-300 bg-[#fafafa]/50 shadow-void drop-shadow-lg hover:opacity-100"
      >
        <div className="flex h-full w-full items-center justify-center gap-6">
          <p className="font-inst text-sm font-medium text-void">
            Continue with
          </p>
          <Image
            alt="google-logo"
            src="/svg/g.svg"
            className={"size-18 shrink-0 text-void drop-shadow-lg"}
          />
        </div>
      </Button>
    </div>
  );
};
