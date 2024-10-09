import { useAuthCtx } from "@/app/ctx/auth";
import { Button } from "@nextui-org/button";
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
        variant="ghost"
        isLoading={loading}
        onClick={handleOnPress}
        className="flex h-14 w-full rounded-md border-[0.33px] border-foreground dark:border-foreground/50 sm:h-12"
      >
        <div className="flex h-full w-full items-center justify-center space-x-4">
          <p className="font-inst text-sm font-medium text-foreground/80">
            Continue with Google
          </p>
          <div
            className={`h-[48px] w-[48px] bg-[url('/svg/google.svg')] bg-center bg-no-repeat`}
          />
        </div>
      </Button>
    </div>
  );
};
