import { useGoogleSignin } from "@/lib/auth/useGoogleSignin";
import { Button } from "@nextui-org/button";
import { auth } from "@/lib/db";
import { type FormEvent } from "react";

export const GoogleSignin = () => {
  const [sign, , loading] = useGoogleSignin(auth);
  const handleOnPress = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await sign();
  };

  return (
    <div className="flex w-full">
      <Button
        isLoading={loading}
        onClick={handleOnPress}
        className="flex h-14 w-full rounded-md border-[0.33px] border-foreground sm:h-12"
      >
        <div className="flex h-full w-full items-center justify-center space-x-3">
          <p className="font-inst font-medium text-foreground/80">
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
