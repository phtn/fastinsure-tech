import { loginFields } from "./schema";
import { InputComponent } from "./input";
import { GoogleSignin } from "./google";
import { memo, useCallback, useState } from "react";
import { Button } from "@nextui-org/react";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { getSession, signUserWithEmail } from "../actions";
import { type UserRecord } from "@/lib/secure/resource";
import { useAuthCtx } from "../ctx/auth";

export const EmailSigninForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setClaims, filterActiveClaims, getUserInfo } = useAuthCtx();

  const InputFields = useCallback(
    () => (
      <div className="h-fit space-y-2">
        {loginFields.map((field) => (
          <InputComponent {...field} key={field.name} />
        ))}
      </div>
    ),
    [],
  );

  const handleSignin = useCallback(
    async (formData: FormData) => {
      setLoading(true);
      const result = (await signUserWithEmail(formData)) as UserRecord;
      if (result) {
        const customClaims = filterActiveClaims(result.CustomClaims);
        setClaims(customClaims);
        const session = await getSession();
        if (!session) return;
        getUserInfo({ id_token: session, uid: result.rawId });
        router.push("/dashboard");
      }
    },
    [router, filterActiveClaims, setClaims, getUserInfo],
  );

  return (
    <form
      action={handleSignin}
      className="flex flex-col space-y-3 py-2 xl:gap-10"
    >
      <InputFields />

      <div className="space-y-4 px-3 text-sm">
        <Submit loading={loading} />
        <GoogleSignin />
      </div>
    </form>
  );
};

const Submit = (props: { label?: string; loading: boolean }) => (
  <Button
    fullWidth
    size="lg"
    type="submit"
    variant="shadow"
    color="primary"
    isLoading={props.loading}
    className="h-14 items-center space-x-4 rounded-md bg-background font-inst text-sm font-medium text-foreground hover:bg-background/80 sm:h-12"
  >
    <div>{props.label ?? "Sign in"}</div>
    <ArrowRightEndOnRectangleIcon className="mx-2 size-5 shrink-0" />
  </Button>
);

export const WithEmailForm = memo(EmailSigninForm);
