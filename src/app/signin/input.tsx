import { forwardRef } from "react";
import { InputField, type InputFieldProps } from "@/ui/input";
import { cn } from "@nextui-org/react";

export const LoginField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <InputField
        sz="md"
        ref={ref}
        type={type}
        name={props.name}
        {...props}
        className={cn(className, "w-full")}
      />
    );
  },
);
LoginField.displayName = "LoginField";
