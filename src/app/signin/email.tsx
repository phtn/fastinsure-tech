import { type EmailAndPassword, loginFields } from "./schema";
import { LoginField } from "./input";
import { GoogleSignin } from "./google";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useAuthCtx } from "../ctx/auth";

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
      className="flex flex-col space-y-3 py-2 xl:gap-10"
    >
      <div className="h-fit space-y-2">
        {loginFields.map((field) => (
          <LoginField
            start={field.icon}
            key={field.name}
            icon={field.icon}
            title={field.label}
            type={field.type}
            {...register(field.name)}
          />
        ))}
      </div>
      <div className="space-y-4 px-3 text-sm">
        <Button
          type="submit"
          variant="shadow"
          color="primary"
          isLoading={loading}
          className="h-14 items-center space-x-4 rounded-md bg-background font-inst text-sm font-semibold text-foreground hover:bg-background/80 sm:h-12"
          fullWidth
        >
          <div>Sign in</div>
        </Button>
        <GoogleSignin />
      </div>
    </form>
  );
};

// const Submit = (props: { label?: string; loading: boolean }) => (
//   <Button
//     fullWidth
//     size="lg"
//     type="submit"
//     variant="shadow"
//     color="primary"
//     isLoading={props.loading}
//     className="h-14 items-center space-x-4 rounded-md bg-background font-inst text-sm font-medium text-foreground hover:bg-background/80 sm:h-12"
//   >
//     <div>{props.label ?? "Sign in"}</div>
//     <ArrowRightEndOnRectangleIcon className="mx-2 size-5 shrink-0" />
//   </Button>
// );

// export const WithEmailForm = memo(EmailSigninForm);
