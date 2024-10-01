import { Button } from "@nextui-org/button";
import { auth } from "@/lib/db";
import { useSignInGoogle } from "./hooks";
import { errHandler } from "@/utils/helpers";
import { type FormEvent } from "react";

export const GoogleSignin = () => {
  const [sign, current, loading, oauth, error] = useSignInGoogle(auth);
  const handleOnPress = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await sign()
      .then((result) => {
        console.log("from hook", current);
        console.log("from result", result);
        console.log("from oauth", oauth);
      })
      .catch(errHandler)
      .finally(() => console.log(error));
  };

  return (
    <div className="flex w-full">
      <Button
        color="default"
        isLoading={loading}
        onClick={handleOnPress}
        size="md"
        className="flex h-14 w-full animate-enter rounded-[2px] delay-1000"
      >
        <div className="flex h-full w-full items-center justify-center space-x-3">
          <p className="px-1 font-sans text-sm font-medium tracking-tighter text-primary/80">
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
