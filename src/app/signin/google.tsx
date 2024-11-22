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
        className="hover: flex w-full border-[0.33px] border-primary-300 bg-[#fafafa]/50 shadow-void drop-shadow-lg hover:opacity-100"
      >
        <div className="flex h-full w-full items-center justify-center gap-6">
          <p className="font-inst text-sm font-medium text-void">
            Continue with Google
          </p>
          <Image
            alt="google-logo"
            src="/svg/google.svg"
            className={"size-5 shadow-void drop-shadow-lg"}
          />
        </div>
      </Button>
    </div>
  );
};
