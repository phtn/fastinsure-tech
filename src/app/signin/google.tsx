import { useAuthCtx } from "@/app/ctx/auth";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { type FormEvent } from "react";

export const GoogleSignin = () => {
  const { signWithGoogle, loading } = useAuthCtx();
  const handleOnPress = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signWithGoogle();
  };

  return (
    <div className="flex w-full">
      <Button
        variant="flat"
        isLoading={loading}
        onClick={handleOnPress}
        className="flex h-14 w-full rounded-md border-[0.33px] border-foreground bg-background/10 hover:bg-background/15 dark:border-foreground/40 sm:h-12"
      >
        <div className="flex h-full w-full items-center justify-center gap-6">
          <p className="font-inst text-sm font-medium text-background/80">
            Continue with Google
          </p>
          <Image
            alt="google-logo"
            src="/svg/google.svg"
            className={"size-5 drop-shadow-lg"}
          />
        </div>
      </Button>
    </div>
  );
};
