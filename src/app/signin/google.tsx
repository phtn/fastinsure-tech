import { useAuthCtx } from "@/app/ctx/auth";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { type FormEvent } from "react";

export const GoogleSignin = () => {
  const { signWithGoogle, googleSigning } = useAuthCtx();
  const handleOnPress = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signWithGoogle();
  };

  return (
    <div className="flex w-full">
      <Button
        size="lg"
        variant="flat"
        radius="sm"
        isLoading={googleSigning}
        onClick={handleOnPress}
        className="shadow-void hover: flex w-full bg-[#fafafa]/50 drop-shadow-lg hover:opacity-100"
      >
        <div className="flex h-full w-full items-center justify-center gap-6">
          <p className="text-void font-inst text-sm font-medium">
            Continue with Google
          </p>
          <Image
            alt="google-logo"
            src="/svg/google.svg"
            className={"shadow-void size-5 drop-shadow-lg"}
          />
        </div>
      </Button>
    </div>
  );
};
