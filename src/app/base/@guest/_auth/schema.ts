import { type HTMLInputTypeAttribute } from "react";
import { z } from "zod";
import { type DualIcon } from "@/app/types";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export const EmailAndPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type EmailAndPassword = z.infer<typeof EmailAndPasswordSchema>;

export interface InputField<TName> {
  name: keyof TName;
  label?: string;
  type: HTMLInputTypeAttribute;
  icon: DualIcon;
}

export const loginFields: InputField<EmailAndPassword>[] = [
  {
    name: "email",
    type: "email",
    icon: EnvelopeIcon,
  },
  {
    name: "password",
    type: "password",
    icon: LockClosedIcon,
  },
];
