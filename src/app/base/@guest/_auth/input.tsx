import { type InputField } from "@/app/base/@guest/_auth/schema";
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
        isInvisible={props.dirty}
        shape="circle"
        showOutline={false}
        placement="bottom-right"
        classNames={{
          badge: cn("size-1"),
        }}
        color={props.valid ? "success" : "warning"}
      >
        <props.icon className="mr-2 size-5 shrink-0 text-primary/40" />
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
      inputWrapper: "shadow-none",
      innerWrapper:
        "bg-primary-200/80 shadow-none border-[0.33px] border-slate-100 h-14 sm:h-12 px-4 rounded-xl",
      input: cn("leading-none font-normal text-sm", {
        "tracking-[4px] font-mono": props.name === "password",
      }),
    }}
    {...props}
  />
));
InputForm.displayName = "InputForm";
