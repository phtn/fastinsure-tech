"use client";

import { Label } from "@/ui/label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleOffIcon, CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";
import type {
  InsertRequest,
  PolicyCoverage,
  PolicyType,
  ServiceType,
} from "convex/requests/d";
import type { RadioFields } from "@/app/dashboard/request/create/forms/fields";

export const RadioGroup = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn("grid gap-2", className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export const RadioGroupItem = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "aspect-square size-4 rounded-full border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {props.disabled ? (
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CircleOffIcon className="size-2.5 text-current" />
      </RadioGroupPrimitive.Indicator>
    ) : (
      <RadioGroupPrimitive.Indicator className="">
        <CheckIcon className="-mr-1.5 -mt-1 size-6 animate-enter stroke-[1.5px] text-secondary-500 drop-shadow-sm dark:text-secondary" />
      </RadioGroupPrimitive.Indicator>
    )}
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

type PolicyTypeFields = RadioFields<PolicyType, InsertRequest>;
type PolicyCoverageFields = RadioFields<PolicyCoverage, InsertRequest>;
type ServiceTypeFields = RadioFields<ServiceType, InsertRequest>;

interface RadioCardProps {
  name: keyof InsertRequest;
  items: PolicyTypeFields[] | PolicyCoverageFields[] | ServiceTypeFields[];
  orientation?: "vertical" | "horizontal";
}
export const RadioGroupCard = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & RadioCardProps
>(({ className, ...props }, ref) => (
  <RadioGroup
    className={cn(
      "gap-0 transition-all duration-300 ease-out transform-gpu hover:shadow-md",
      { flex: props.orientation === "horizontal" },
      className,
    )}
    defaultValue={props?.items?.[0]?.title}
    ref={ref}
    {...props}
  >
    {props.items.map((item) => (
      <div
        key={item.title}
        className={cn(
          "relative flex w-full items-start p-4 tracking-wide shadow-sm shadow-black/5",
          "bg-primary-50 dark:bg-transparent/10 dark:backdrop-blur-xl",
          "border-y border-r border-dashed border-primary-300/80 border-l-transparent first:rounded-s-md first:border-l first:border-l-primary-400 last:rounded-e-md last:border-r dark:border-primary-500",
          "has-[[data-state=checked]]:bg-warning-200/20 has-[[data-state=checked]]:dark:bg-background",
          "has-[[data-state=checked]]:border-double has-[[data-state=checked]]:border-primary-400",
          "has-[[data-state=checked]]:before:border-r-transparent",
          "dark:border-primary-300",
        )}
      >
        <RadioGroupItem
          value={item.title}
          id={item.title}
          aria-describedby={item.description}
          className="order-1 after:absolute after:inset-0"
          disabled={item.disabled}
        />
        <div className="mr-2 flex grow items-start gap-2">
          <item.icon
            className={cn(
              "-ml-2 -mt-1 size-5 shrink-0 stroke-1 text-primary-700",
              {
                "opacity-50": item.disabled,
              },
            )}
          />
          <div className="pointer-events-none grid h-10 grow gap-2">
            <Label
              htmlFor={item.name}
              className={cn("font-inter font-semibold capitalize opacity-80", {
                "opacity-60": item.disabled,
              })}
            >
              {item.title}
              <span className="text-xs font-normal leading-[inherit]"></span>
            </Label>
            <p
              id={`${item.title}-description`}
              className="pointer-events-none max-w-[50ch] whitespace-nowrap text-xs font-light tracking-tight opacity-80"
            >
              {item.disabled ? "Not available" : item.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </RadioGroup>
));
RadioGroupCard.displayName = "RadioGroupCard";
