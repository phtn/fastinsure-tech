"use client";

import { Label } from "@/ui/label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle, CircleOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import type {
  InsertRequest,
  PolicyCoverage,
  PolicyType,
  ServiceType,
} from "convex/requests/d";
import type { RadioFields } from "@/app/[uid]/requests/[...slug]/forms/create";

export const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
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
  ElementRef<typeof RadioGroupPrimitive.Item>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    {props.disabled ? (
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CircleOffIcon className="size-2.5 text-current" />
      </RadioGroupPrimitive.Indicator>
    ) : (
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
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
  horizontal?: boolean;
}
export const RadioGroupCard = forwardRef<
  ElementRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & RadioCardProps
>(({ className, ...props }, ref) => (
  <RadioGroup
    className={cn("gap-0", { flex: props.horizontal }, className)}
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
          "border-y border-r border-dashed border-primary-400 border-l-transparent first:rounded-s-md first:border-l first:border-l-primary-400 last:rounded-e-md last:border-r dark:border-primary-500",
          "has-[[data-state=checked]]:bg-warning-300/20 has-[[data-state=checked]]:dark:bg-background",
          "has-[[data-state=checked]]:border-double has-[[data-state=checked]]:border-x-primary-400",
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
            className={cn("-mt-1 size-5 shrink-0 stroke-1", {
              "opacity-50": item.disabled,
            })}
          />
          <div className="grid h-10 grow gap-2">
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
              className="pointer-events-none max-w-[50ch] whitespace-nowrap text-xs font-light tracking-tight opacity-60"
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
