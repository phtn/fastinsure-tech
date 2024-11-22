import { type EmailAndPassword, loginFields } from "./schema";
import { LoginField } from "./input";
import { GoogleSignin } from "./google";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Image, Link } from "@nextui-org/react";
import { useAuthCtx } from "../ctx/auth";
import { cn } from "@/lib/utils";
import { Support } from "./tabs";

export const EmailSigninForm = () => {
  const { signUserWithEmail, loading } = useAuthCtx();

  const { register, handleSubmit } = useForm<EmailAndPassword>({
    defaultValues: { email: "", password: "" },
  });

  const creds = useCallback(
    async (data: EmailAndPassword) => {
      await signUserWithEmail(data);
    },
    [signUserWithEmail],
  );

  return (
    <form
      onSubmit={handleSubmit(creds)}
      className="mx-12 flex h-fit flex-col items-end space-y-6 py-8 text-primary"
    >
      <div className="flex h-14 w-2/3 items-end justify-start px-3 text-xl font-semibold tracking-tight">
        <header>Sign in with email</header>
      </div>
      <div
        className={cn(
          "flex h-full w-2/3 flex-col overflow-hidden rounded-md border-[0.33px] border-primary-300 shadow-sm shadow-primary-200",
          "transition-all duration-500 ease-out transform-gpu hover:shadow-md",
        )}
      >
        {loginFields.map((field) => (
          <LoginField
            start={field.icon}
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
              "bg-[#fafafa]",
            )}
            {...register(field.name === "email" ? "email" : "password")}
          />
        ))}
      </div>
      <div className="w-2/3 space-y-2 p-4 text-sm">
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
    </form>
  );
};

export const SigninHeader = () => (
  <div className="absolute left-0 top-0 z-[70] flex h-[calc(100vh*0.15)] w-full items-center space-x-4 pl-8">
    <div className="flex size-[24px] items-center justify-center rounded-full border-[0.33px] border-[#1B1F22]/50 bg-[#1B1F22]/10 xl:size-[32px]">
      <Link className="/">
        <Image
          alt=""
          src="/svg/logo_dark.svg"
          className="size-[12px] rounded-none xl:size-[16px]"
        />
      </Link>
    </div>
    <Link className="/">
      <h1 className="font-inst font-medium text-[#1B1F22] drop-shadow-lg xl:text-lg">
        FastInsure Technologies
      </h1>
    </Link>
  </div>
);
