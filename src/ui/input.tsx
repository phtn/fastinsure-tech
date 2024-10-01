import { type InputField } from "@/app/_comp/schema";
import { type EmailAndPassword } from "@/lib/auth/useSignIn";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Badge, Button, Input } from "@nextui-org/react";
import { type FormEvent, forwardRef } from "react";

export const InputForm = forwardRef<
  HTMLInputElement,
  InputField<EmailAndPassword> & {
    fn: (e: FormEvent<HTMLButtonElement>) => void;
    valid: boolean;
    loading: boolean;
    dirty: boolean;
  }
>(({ ...props }, ref) => (
  <Input
    ref={ref}
    startContent={
      <Badge
        size="sm"
        content=""
        shape="circle"
        showOutline={false}
        placement="bottom-right"
        classNames={{
          badge: cn({ "hidden ": !props.dirty }),
        }}
        color={props.valid ? "success" : "warning"}
      >
        <props.icon className="mr-2 size-5 shrink-0 text-primary/40 drop-shadow-lg" />
      </Badge>
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
            <EyeSlashIcon className="mx-2 size-5 shrink-0 text-primary/40 drop-shadow-lg" />
          ) : (
            <EyeIcon className="mx-2 size-5 shrink-0 text-primary/40 drop-shadow-lg" />
          )}
        </Button>
      ) : null
    }
    size="lg"
    isRequired
    disabled={props.loading}
    className="animate-enter outline-none focus:outline-none"
    classNames={{
      inputWrapper: "shadow-none",
      innerWrapper:
        "border-[0.33px] border-primary/20 h-14 px-4 rounded-xl bg-white/30 backdrop-blur-md",
      input: cn("leading-none font-normal text-sm", {
        "tracking-[4px] drop-shadow-lg font-mono": props.name === "password",
      }),
    }}
    {...props}
  />
));
InputForm.displayName = "InputForm";
