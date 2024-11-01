import { type InputField } from "./schema";
import { type SignInWithEmailAndPassword } from "@/lib/auth/resource";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@nextui-org/react";
import { type FormEvent, forwardRef } from "react";

export const InputForm = forwardRef<
  HTMLInputElement,
  InputField<SignInWithEmailAndPassword> & {
    fn: (e: FormEvent<HTMLButtonElement>) => void;
    valid: boolean;
    loading: boolean;
    dirty: boolean;
  }
>(({ ...props }, ref) => (
  <Input
    ref={ref}
    startContent={
      <props.icon className="mr-2 size-5 shrink-0 text-primary/40" />
    }
    endContent={
      props.name === "password" ? (
        <Button
          isIconOnly
          variant="ghost"
          className="rounded-full border-0 bg-transparent hover:bg-transparent"
          onClick={props.fn}
        >
          {props.type === "password" ? (
            <EyeSlashIcon className="size-5 shrink-0 text-primary/40" />
          ) : (
            <EyeIcon className="size-5 shrink-0 text-primary/40" />
          )}
        </Button>
      ) : null
    }
    isRequired
    disabled={props.loading}
    className="outline-none focus:outline-none"
    classNames={{
      mainWrapper: "px-4",
      inputWrapper: "shadow-none w-full px-0 py-0",
      innerWrapper:
        "dark:bg-background/40 bg-foreground/15 shadow-none px-4 border-[0.33px border-slate-100 h-16 sm:h-12 rounded-lg",
      input: cn("leading-none py-2 font-normal bg-foreground text-sm", {
        "tracking-[4px] font-mono": props.name === "password",
      }),
    }}
    size="lg"
    {...props}
  />
));
InputForm.displayName = "InputForm";
