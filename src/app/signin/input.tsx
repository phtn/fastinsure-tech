import { forwardRef } from "react";
import { InputField, type InputFieldProps } from "@/ui/input";

export const LoginField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <InputField
        sz="lg"
        ref={ref}
        type={type}
        name={props.name}
        {...props}
        className={className}
      />
    );
  },
);
LoginField.displayName = "LoginField";
