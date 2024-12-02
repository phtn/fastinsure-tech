import { type EmailAndPassword, loginFields } from "./schema";
import { GoogleSignin } from "./google";
import { useForm } from "react-hook-form";
import { Button, Link } from "@nextui-org/react";
import { useAuthCtx } from "../ctx/auth";
import { cn } from "@/lib/utils";
import { FastField } from "@/ui/input";

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
      <div className="h-full w-[calc(25vw)] space-y-6 border-x-[0.33px] border-primary px-10 py-8 dark:bg-zinc-900">
        <div className="flex h-14 w-full items-end justify-start px-2 font-inter text-2xl font-semibold tracking-tighter">
          <header>Sign in</header>
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
            className="h-[rem] w-full items-center space-x-4 font-inst text-sm font-semibold sm:h-12"
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
