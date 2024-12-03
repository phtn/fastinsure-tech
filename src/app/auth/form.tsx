import { type EmailAndPassword, loginFields } from "./schema";
import { useForm } from "react-hook-form";
import { Button, Image, Link } from "@nextui-org/react";
import { useAuthCtx } from "../ctx/auth";
import { cn } from "@/lib/utils";
import { FastField } from "@/ui/input";
import { type FormEvent, useCallback } from "react";
import { Err } from "@/utils/helpers";

export const EmailSigninForm = () => {
  const { signUserWithEmail, loading } = useAuthCtx();
  const defaultValues = { email: "", password: "" };
  const { register } = useForm<EmailAndPassword>({
    defaultValues,
  });

  // const signInAction = useCallback(
  //   async (state: UserCredential | null, data: FormData) => {
  //     const validatedLoginData = EmailAndPasswordSchema.safeParse({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //     if (validatedLoginData.success) {
  //       await signUserWithEmail(data);
  //     }
  //     if (validatedLoginData.error) {
  //       onWarn("Invalid credentials.");
  //     }
  //   },
  //   [signUserWithEmail],
  // );

  return (
    <form
      action={signUserWithEmail}
      className="flex h-full w-full flex-col items-end text-primary"
    >
      <div className="h-full w-full space-y-6 px-10 py-8 dark:bg-zinc-900">
        <div className="flex h-8 w-full items-end justify-start px-2 font-inter text-xl font-semibold tracking-tighter dark:text-icon-dark">
          <header>Sign in with email</header>
        </div>
        <div
          className={cn(
            "flex h-fit w-full flex-col overflow-hidden rounded-lg border-[0.33px] border-primary-300 shadow-sm shadow-primary-200",
            "transition-all duration-500 ease-out transform-gpu hover:shadow-md",
          )}
        >
          {loginFields.map((field) => (
            <FastField
              key={field.name}
              icon={field.icon}
              title={field.label}
              type={field.type}
              className={cn(
                {
                  "w-full rounded-b-none rounded-t-lg border-b-0 border-primary":
                    field.name === "email",
                },
                {
                  "border-x-double rounded-b-lg rounded-t-none border-t-[0.33px] border-primary-300":
                    field.name === "password",
                },
                "dark:bg-adam/20",
              )}
              // {...register(field.name === "email" ? "email" : "password")}
              {...register(field.name)}
            />
          ))}
        </div>
        <div className="w-full space-y-2 p-4 text-sm">
          <Button
            radius="sm"
            type="submit"
            variant="solid"
            color="primary"
            isLoading={loading}
            className="w-full items-center space-x-4 font-inst text-sm font-semibold dark:bg-[#fafafa]/70 sm:h-12"
            fullWidth
          >
            <div>Sign in</div>
          </Button>
          <div className="flex h-8 items-center justify-center text-xs">
            <p>or</p>
          </div>
          <GoogleSignin />

          <div className="flex h-8 items-center justify-center text-xs"></div>

          <Support />
        </div>
      </div>
    </form>
  );
};

const Support = () => (
  <div className="flex w-full items-center justify-center space-x-4 pb-6 text-xs tracking-tight opacity-70">
    <Link
      size="sm"
      className="cursor-pointer font-normal decoration-background/40 underline-offset-4 hover:underline"
    >
      <p>Sign up</p>
    </Link>
    <p className="text-center font-light">|</p>
    <Link
      size="sm"
      className="cursor-pointer font-normal decoration-background/40 underline-offset-4 hover:underline"
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
