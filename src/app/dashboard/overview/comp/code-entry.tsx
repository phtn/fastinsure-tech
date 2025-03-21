import { onWarn } from "@/app/ctx/toasts";
import { cn } from "@/lib/utils";
import type { AccountActivationResponse } from "@/server/secure/resource";
import { Button, Input } from "@nextui-org/react";
import { useActionState, useCallback } from "react";

interface CodeEntryProps {
  activateFn: (hcode: string) => Promise<AccountActivationResponse | undefined>;
}
export const CodeEntry = ({ activateFn }: CodeEntryProps) => {
  const initialState = {} as AccountActivationResponse;

  const activateAccount = useCallback(
    async (prev: AccountActivationResponse | undefined, f: FormData) => {
      const v = {
        hcode: f.get("hcode") as string,
      };
      if (v.hcode.length !== 6) {
        onWarn("Invalid Code");
      }

      prev = await activateFn(v.hcode);
      return prev;
    },
    [activateFn],
  );
  const [, action, pending] = useActionState(activateAccount, initialState);

  return (
    <div className={cn("z-50 h-fit w-fit space-y-6 overflow-hidden")}>
      <div className="font-inst text-3xl tracking-tighter font-extrabold text-void dark:text-chalk/80">
        When you&apos;re ready,
      </div>
      <form
        action={action}
        className="flex h-fit w-full items-center flex-col space-y-4 whitespace-nowrap px-1"
      >
        <Input
          size="lg"
          name="hcode"
          color="primary"
          radius="md"
          placeholder="enter code"
          className="w-48 font-bold tracking-[0.25rem] text-foreground/80"
          classNames={{
            input:
              "text-center uppercase bg-white dark:text-void placeholder:lowercase placeholder:tracking-normal placeholder:opacity-40",
            inputWrapper:
              "border bg-chalk border-macl-gray/40 dark:bg-adam dark:border-primary-100",
          }}
        />
        <Button
          size="lg"
          isLoading={pending}
          type="submit"
          className="w-48"
        >
          <span className="pl-2 text-white text-sm">Activate</span>
        </Button>
      </form>
    </div>
  );
};
