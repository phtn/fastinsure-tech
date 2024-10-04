import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type EmailAndPassword,
  EmailAndPasswordSchema,
  loginFields,
} from "./schema";
import { InputForm } from "./input";
import { GoogleSignin } from "./google";
import { useSignInWithEmail } from "@/lib/auth/useSignIn";
import { type FormEvent, useCallback, useMemo, useState } from "react";
import { Button } from "@nextui-org/react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

export const EmailSigninForm = () => {
  const [secure, setSecure] = useState(true);
  const toggleSecure = useCallback((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSecure((s) => !s);
  }, []);
  const form = useForm<EmailAndPassword>({
    resolver: zodResolver(EmailAndPasswordSchema),
    defaultValues: {},
  });
  const { handleSubmit, formState, register } = form;
  const { isValid, isDirty } = formState;

  const { signIn, loading, creds } = useSignInWithEmail();

  const InputFields = useMemo(
    () => (
      <div className="mt-3 h-fit space-y-6 sm:mt-1 sm:space-y-4 xl:mt-4 xl:space-y-6">
        {loginFields.map((field) => (
          <InputForm
            {...field}
            {...register(field.name)}
            valid={isValid}
            dirty={isDirty}
            loading={loading}
            fn={toggleSecure}
            key={field.name}
            type={
              field.name === "password"
                ? secure
                  ? "password"
                  : "text"
                : "text"
            }
          />
        ))}
      </div>
    ),
    [isDirty, isValid, loading, register, secure, toggleSecure],
  );

  const onSubmit = async (data: EmailAndPassword) => {
    await signIn(data);
    console.log(creds);
  };

  return (
    <form
      className="flex flex-col gap-y-4 space-y-6 py-2 xl:gap-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      {InputFields}

      <div className="space-y-4 px-3 text-sm">
        <Button
          fullWidth
          type="submit"
          color="primary"
          isLoading={loading}
          disabled={!isValid}
          className="font-inst h-14 items-center space-x-4 rounded-md font-medium sm:h-12"
        >
          <div>Sign in</div>
          <ArrowRightEndOnRectangleIcon className="mx-2 size-6 shrink-0" />
        </Button>
        <GoogleSignin />
      </div>
    </form>
  );
};
