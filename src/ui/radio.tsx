"use client";

import { Label } from "@/ui/label";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
  memo,
} from "react";
import type {
  InsertRequest,
  PolicyCoverage,
  PolicyType,
  ServiceType,
} from "convex/requests/d";
import type { RadioFields } from "@/app/dashboard/request/create/forms/fields";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { HyperList } from "./list";

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
        <CheckCircleIcon className="-ml-2 -mt-4 size-6 animate-enter stroke-2 text-secondary drop-shadow-sm dark:text-secondary" />
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
      "gap-0 space-x-2 rounded-lg",
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
          "relative flex w-fit items-start p-4 tracking-wide shadow-sm shadow-void/5",
          "bg-primary-100/60 dark:bg-primary-100 dark:backdrop-blur-xl",
          "overflow-clip rounded-lg",
          "border-2 border-primary-100/40",
          "has-[[data-state=checked]]:bg-chalk has-[[data-state=checked]]:text-primary",
          "has-[[data-state=checked]]:dark:border-secondary has-[[data-state=checked]]:dark:bg-background",
          "has-[[data-state=checked]]:border-secondary dark:border-primary-300/60",
          "",
        )}
      >
        <RadioGroupItem
          value={item.title}
          id={item.title}
          aria-describedby={item.description}
          className="order-1 p-2 after:absolute after:inset-0"
          disabled={item.disabled}
        />
        <div className="flex grow items-start gap-2 transition-all duration-300 ease-out transform-gpu hover:shadow-md">
          <item.icon
            className={cn("-ml-1 -mt-0.5 size-4 shrink-0 stroke-1", {
              "opacity-50": item.disabled,
            })}
          />
          <div className="pointer-events-none grid h-10 grow gap-2">
            <Label
              htmlFor={item.name}
              className={cn(
                "pe-4 font-inst font-semibold capitalize tracking-tight opacity-80",
                {
                  "opacity-60": item.disabled,
                },
              )}
            >
              {item.title}
            </Label>
            <p
              id={`${item.title}-description`}
              className={cn(
                "pointer-events-none max-w-[50ch] whitespace-nowrap text-xs font-light tracking-tight opacity-80",
                { "opacity-70": item.disabled },
              )}
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

const HyperRadio = forwardRef<
  ComponentRef<typeof RadioGroupPrimitive.Root>,
  ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & RadioCardProps
>(({ className, ...props }, ref) => (
  <RadioGroup
    className={cn(
      "gap-0 space-x-2 rounded-lg",
      { flex: props.orientation === "horizontal" },
      className,
    )}
    defaultValue={props?.items?.[0]?.title}
    ref={ref}
    {...props}
  >
    <HyperList
      data={props.items}
      component={Item}
      keyId="title"
      container="flex space-x-2"
    />
  </RadioGroup>
));
HyperRadio.displayName = "HyperRadio";
export const HyperRadioCard = memo(HyperRadio);

const RadioItem = (
  item: PolicyTypeFields | PolicyCoverageFields | ServiceTypeFields,
) => (
  <div
    key={item.title}
    className={cn(
      "relative flex w-fit items-start p-4 tracking-wide shadow-sm shadow-void/5",
      "bg-primary-100/60 dark:bg-primary-100 dark:backdrop-blur-xl",
      "overflow-clip rounded-lg",
      "border-2 border-primary-100/40",
      "has-[[data-state=checked]]:bg-chalk has-[[data-state=checked]]:text-primary",
      "has-[[data-state=checked]]:dark:border-secondary has-[[data-state=checked]]:dark:bg-background",
      "has-[[data-state=checked]]:border-secondary dark:border-primary-300/60",
      "",
    )}
  >
    <RadioGroupItem
      value={item.title}
      id={item.title}
      aria-describedby={item.description}
      className="order-1 p-2 after:absolute after:inset-0"
      disabled={item.disabled}
    />
    <div className="flex grow items-start gap-2 transition-all duration-300 ease-out transform-gpu hover:shadow-md">
      <item.icon
        className={cn("-ml-1 -mt-0.5 size-4 shrink-0 stroke-1", {
          "opacity-50": item.disabled,
        })}
      />
      <div className="pointer-events-none grid h-10 grow gap-2">
        <Label
          htmlFor={item.name}
          className={cn(
            "pe-4 font-inst font-semibold capitalize tracking-tight opacity-80",
            {
              "opacity-60": item.disabled,
            },
          )}
        >
          {item.title}
        </Label>
        <p
          id={`${item.title}-description`}
          className={cn(
            "pointer-events-none sm:max-w-[50ch] whitespace-nowrap text-xs font-light tracking-tight opacity-80",
            { "opacity-70": item.disabled },
          )}
        >
          {item.disabled ? "Not available" : item.description}
        </p>
      </div>
    </div>
  </div>
);

const Item = memo(RadioItem);
