import {
  type EmailAndPassword,
  EmailAndPasswordSchema,
  loginFields,
} from "./schema";
import { GoogleSignin } from "./google";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useAuthCtx } from "../ctx/auth";
import { cn } from "@/lib/utils";
import { Support } from "./tabs";
import { FastField } from "@/ui/input";
import { onWarn } from "../ctx/toasts";
// import { useRouter } from "next/navigation";
// import { Err } from "@/utils/helpers";

export const EmailSigninForm = () => {
  const { signUserWithEmail, loading } = useAuthCtx();
  // const router = useRouter();

  const { register } = useForm<EmailAndPassword>({
    defaultValues: { email: "", password: "" },
  });

  // const creds = useCallback(
  //   async (data: EmailAndPassword) => {
  //     await signUserWithEmail(data)
  //       .then(() => {
  //         router.push("/dashboard");
  //       })
  //       .catch(Err);
  //   },
  //   [signUserWithEmail, router],
  // );

  const signInAction = useCallback(
    async (data: FormData) => {
      const validatedLoginData = EmailAndPasswordSchema.safeParse({
        email: data.get("email"),
        password: data.get("password"),
      });
      if (validatedLoginData.success) {
        await signUserWithEmail({ ...validatedLoginData.data });
      }
      if (validatedLoginData.error) {
        onWarn("Invalid credentials.");
      }
    },
    [signUserWithEmail],
  );

  return (
    <form
      action={signInAction}
      // onSubmit={handleSubmit(creds)}
      className="flex h-full w-full flex-col items-end text-primary"
    >
      <div className="h-full w-[calc(33vw)] space-y-6 border-x-[0.33px] border-primary-300 px-10 py-8">
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
