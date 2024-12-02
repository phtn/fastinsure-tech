import { type HTMLInputTypeAttribute } from "react";
import { z } from "zod";
import { type DualIcon } from "@/app/types";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export const EmailAndPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type EmailAndPassword = z.infer<typeof EmailAndPasswordSchema>;

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  displayName: z.string().optional(),
  phoneNumber: z.string().optional(),
  photoURL: z.string().optional(),
});

export type Signup = z.infer<typeof SignupSchema>;

export interface IInputField<TName> {
  icon: DualIcon;
  name: keyof TName;
  label?: string;
  type: HTMLInputTypeAttribute;
}

export const loginFields: IInputField<EmailAndPassword>[] = [
  {
    name: "email",
    type: "email",
    icon: EnvelopeIcon,
    label: "email-input",
  },
  {
    name: "password",
    type: "password",
    icon: LockClosedIcon,
    label: "password-input",
  },
];
