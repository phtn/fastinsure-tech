"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
  useMemo,
} from "react";
import { Label } from "./label";

export const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "focus-visible:ring-ring peer h-4 w-4 shrink-0 rounded-[5px] border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// "rounded-md border border-dotted border-primary-400 dark:border-primary-500",
export const CardCheckbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const isChecked = useMemo(() => props.checked, [props.checked]);
  return (
    <div
      className={cn(
        "relative p-4 pb-8 shadow-sm shadow-black/5",
        "flex w-full items-start gap-2",
        "rounded-md border border-dotted border-primary-400 dark:border-primary-500",
        "bg-slate-300/15 tracking-wide",
        "dark:bg-primary-100/80",
      )}
    >
      <Checkbox
        ref={ref}
        id={props.name}
        className={cn("order-1 after:absolute after:inset-0", className)}
        aria-describedby="fast-checkbox"
        {...props}
      />
      <div className="flex grow items-start gap-3">
        <svg
          className="shrink-0"
          width={32}
          height={24}
          viewBox="0 0 32 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="32" height="24" rx="4" fill="#252525" />
          <path
            d="M19.0537 6.49742H12.9282V17.5026H19.0537V6.49742Z"
            fill="#FF5A00"
          />
          <path
            d="M13.3359 12C13.3359 9.76408 14.3871 7.77961 16 6.49741C14.8129 5.56408 13.3155 5 11.6822 5C7.81295 5 4.68221 8.13074 4.68221 12C4.68221 15.8693 7.81295 19 11.6822 19C13.3155 19 14.8129 18.4359 16 17.5026C14.3848 16.2385 13.3359 14.2359 13.3359 12Z"
            fill="#EB001B"
          />
          <path
            d="M27.3178 12C27.3178 15.8693 24.1871 19 20.3178 19C18.6845 19 17.1871 18.4359 16 17.5026C17.6333 16.2181 18.6641 14.2359 18.6641 12C18.6641 9.76408 17.6129 7.77961 16 6.49741C17.1848 5.56408 18.6822 5 20.3155 5C24.1871 5 27.3178 8.15113 27.3178 12Z"
            fill="#F79E1B"
          />
        </svg>
        <div className="grid gap-2">
          <Label htmlFor={props.name}>
            Autos
            <span
              className={cn(
                "font-inter text-sm tracking-tighter dark:text-primary-800",
              )}
            >
              {props.title}
            </span>
          </Label>
          <p id="checkbox-14-description" className="text-xs">
            {isChecked ? "checked" : "not checked"}
          </p>
        </div>
      </div>
    </div>
  );
});
CardCheckbox.displayName = "CardCheckbox";
