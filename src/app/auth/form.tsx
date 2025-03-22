import { type EmailAndPassword, loginFields } from "./schema";
import { useForm } from "react-hook-form";
import { Image, Spinner } from "@nextui-org/react";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { cn } from "@/lib/utils";
import { FastField } from "@/ui/input";
import { type FormEvent, useCallback, useMemo, useState } from "react";
import { Err, opts } from "@/utils/helpers";
import { FlexRow } from "@/ui/flex";
import moment from "moment";
import { ButtSex } from "@/ui/button/ripple";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type { DualIcon } from "../types";
import { ArrowUpRightSquare } from "lucide-react";

export const EmailSigninForm = (props: { lastLogin: string | undefined }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { signUserWithEmail, loading, googleSigning, signupUserWithEmail } = useAuthCtx();
  const defaultValues = { email: "", password: "" };

  const handleToggle = useCallback((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSignIn(!isSignIn);
  }, [isSignIn]);

  const { register } = useForm<EmailAndPassword>({
    defaultValues,
  });

  const timestamp = useMemo(
    () =>
      moment()
        .subtract(Number(props.lastLogin) - Date.now(), "milliseconds")
        .calendar(),
    [props.lastLogin],
  );

  const HeadingOptions = useCallback(() => {
    // const isLoading = loading || googleSigning;
    const options = opts(
      <header className="flex w-full items-center justify-start space-x-4">
        <p>Signing in...</p> <Spinner size="sm" color="secondary" />
      </header>,
      <header className="flex w-full justify-start">Sign {isSignIn ? "in" : "up"}</header>,
    );
    return <>{options.get(loading)}</>;
  }, [loading, isSignIn]);

  const SignButtonOptions = useCallback(() => {
    const options = opts(<SignInButton isSignIn={isSignIn} icon={ArrowRightEndOnRectangleIcon} loading={loading} />, <SignInButton isSignIn={isSignIn}  icon={ArrowUpRightSquare} loading={loading} />)
    return  <>{options.get(isSignIn)}</>
  }, [loading, isSignIn])

  return (
    <form
      action={isSignIn ? signUserWithEmail : signupUserWithEmail}
      className="flex h-full w-full min-w-[22rem] max-w-[22rem] flex-col items-end text-primary portrait:w-screen"
    >
      <div className="flex h-full w-full flex-col items-center space-y-6">
        <div className="flex h-16 w-full items-end justify-center px-8 text-xl font-semibold -tracking-wider dark:text-icon-dark">
          <HeadingOptions />
        </div>
        <div
          className={cn(
            "flex h-fit flex-col items-center justify-center",
            "min-w-[18rem] max-w-[18rem]",
            "overflow-clip rounded-lg border-[0.33px] border-primary",
            "text-chalk shadow-primary-200 portrait:w-[calc(83vw)]",
            "transition-all duration-500 ease-out transform-gpu hover:shadow-md",
          )}
        >
          {loginFields.map((field) => (
            <FastField
              key={field.name}
              icon={field.icon}
              title={field.label}
              type={field.type}
              disabled={loading || googleSigning}
              autoFocus={field.name === "email"}
              className={cn(
                {
                  "w-full rounded-b-none rounded-t-lg border-b-0":
                    field.name === "email",
                },
                {
                  "dark:primary-200 rounded-b-lg rounded-t-none border-t-[0.33px] border-primary":
                    field.name === "password",
                },
                "bg-adam/20 dark:bg-adam",
              )}
              // {...register(field.name === "email" ? "email" : "password")}
              {...register(field.name)}
            />
          ))}
        </div>
        <div className="flex w-[18.5rem] flex-col items-center justify-center space-y-2 text-sm">
          <SignButtonOptions />
          <div className="flex items-center justify-center font-mono text-xs tracking-tight text-void/80">
            <p>or</p>
          </div>
          <GoogleSignin />
        </div>
        <Support toggleFn={handleToggle} isSignIn={isSignIn} />

        <div className="w-full border-t-[0.33px] border-steel/20 mt-2">
          <FlexRow className="relative h-[48px] w-full items-center justify-center bg-steel/10">
            <p className="w-fit space-x-2 whitespace-nowrap p-1.5 font-jet text-[10px] font-light capitalize leading-none text-void">
              <span>Last login</span>
              <span className="text-[8px]">{`:`}</span>
              <span className="capitalize">{timestamp}</span>
            </p>
          </FlexRow>
        </div>
      </div>
    </form>
  );
};

interface SignButtonProps {
  loading: boolean;
  icon: DualIcon
  isSignIn: boolean;
}
const SignInButton = ({loading,icon: IconComponent, isSignIn }: SignButtonProps) => {
  return (
    <ButtSex
      size="lg"
      type="submit"
      disabled={loading}
      className="flex w-[18rem] items-center justify-center text-medium"
    >
      <div className="flex h-full items-center justify-between gap-4 dark:text-icon-dark">
        <p className="flex w-full font-inst text-xs font-medium leading-none">
          Sign <span className="pl-1 lowercase">{isSignIn ? 'in ' : 'up '} with email</span>
        </p>
        {loading ? (
          <Spinner size="sm" className="size-5 shrink-0 dark:text-icon-dark" />
        ) : (
          <IconComponent
          className={"size-5 stroke-1 shrink-0 dark:text-icon-dark"}
          />
        )}
      </div>
    </ButtSex>
  )
}

interface SupportProps {
  toggleFn: (e: FormEvent<HTMLButtonElement>) => void;
  isSignIn: boolean;
}

const Support = ({ toggleFn, isSignIn }: SupportProps) => (

  <div className="flex h-6 w-full items-center justify-center space-x-4 text-xs tracking-tight text-primary">
    <button
      onClick={toggleFn}
      className="decoration-primary w-10 underline-offset-[5px] hover:underline"
    >
      <p>{isSignIn ? "Sign up" : "Sign in"}</p>
    </button>
    <p className="text-center font-light opacity-15">|</p>
    <Link
      href={"#"}
      className="cursor-pointer decoration-void/60 underline-offset-[5px] hover:underline"
    >
      <p>Account Recovery</p>
    </Link>
  </div>
);

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
    <ButtSex
      size="lg"
      loading={googleSigning}
      onClick={handleOnPress}
      inverted
      className="flex w-[18rem] border-[0.33px] border-primary-300 shadow-void drop-shadow-lg hover:text-chalk hover:opacity-100 dark:bg-[#fafafa]/50 dark:shadow-void"
    >
      <div className="flex h-full w-full items-center justify-center gap-3">
        <p className="flex w-full font-inst text-xs font-medium dark:text-void">
          Continue <span className="px-1 lowercase">with</span> Google
        </p>
        <div className="flex h-5 w-7 items-center justify-center rounded-full">
          <Image
            alt="google-logo"
            src="/svg/g.svg"
            radius="none"
            className={"h-4 w-5 shrink-0 drop-shadow-lg invert dark:invert-0"}
          />
        </div>
      </div>
    </ButtSex>
  );
};
