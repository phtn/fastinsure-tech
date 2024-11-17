import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ReactElement,
  type InputHTMLAttributes,
  useMemo,
} from "react";
import { AsteriskIcon, LoaderCircle } from "lucide-react";
import { type DualIcon } from "@/app/types";
import { mapUnion, passwordSecure } from "@/utils/helpers";
import { useThemeCtx } from "@/app/ctx/theme";
import type { RequestFields } from "@/app/[uid]/requests/[...slug]/forms/create";
import { PhotoIcon } from "@heroicons/react/24/outline";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: DualIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-background/5 px-3 py-2 text-sm ring-offset-primary-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:border-dashed disabled:bg-slate-300/20 disabled:opacity-50 disabled:drop-shadow-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
type InputSize = "xs" | "sm" | "md" | "lg" | "xl" | "none";

interface InputFieldProps extends Omit<InputProps, "size"> {
  start?: DualIcon | null;
  end: ReactElement | null;
  loading?: boolean;
  size?: InputSize;
  secure?: boolean;
}
const inputSizes = mapUnion<InputSize>().build({
  xs: "h-8",
  sm: "h-10",
  md: "h-12",
  lg: "h-14",
  xl: "h-16",
  none: "h-10",
});

const inputRadius = mapUnion<InputSize>().build({
  xs: "rounded-sm",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  none: "rounded-none",
});

export function InputField(props: InputFieldProps) {
  const { theme } = useThemeCtx();

  const inputType = useMemo(
    () => props.name && passwordSecure(props.name, props.secure ?? false),
    [props.name, props.secure],
  );
  const className = useMemo(
    () =>
      cn(
        "peer ps-12 text-lg font-inst",
        theme === "dark" ? "text-background" : "text-foreground",
        inputSizes.get(props.size ?? "sm"),
        inputRadius.get(props.size ?? "sm"),
        { "tracking-widest": props.secure },
      ),
    [props.size, theme, props.secure],
  );
  return (
    <div className="space-y-0">
      <div className="relative">
        <Input
          id={props.name}
          name={props.name}
          type={inputType}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={className}
        />
        <div className="pointer-events-none absolute inset-y-0 start-1 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {props.start ? (
            <props.start
              aria-hidden="true"
              className="size-5 stroke-[1.5px] opacity-70"
            />
          ) : null}
        </div>
        <div
          className="focus-visible:border-ring focus-visible:ring-ring/30 absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={"end-icon"}
        >
          <div className="absolute inset-y-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
            {props.loading ? (
              <LoaderCircle
                className="animate-spin"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              props.end
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const FastField = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <div
      className={cn(
        "flex h-[50px] w-full items-center border-b-[0.33px] border-primary-400 bg-primary-100 pl-3 ps-2 shadow-default/30 drop-shadow-sm focus-within:border focus-within:border-warning focus-within:ring-offset-0 active:border-warning",
        className,
      )}
    >
      {props.icon ? (
        <props.icon className="size-5 shrink-0 stroke-1 text-foreground/60" />
      ) : null}

      <input
        {...props}
        type={type}
        ref={ref}
        className="placeholder:text-clay/50 h-[42px] w-full rounded-md bg-transparent px-2 font-sans text-[16px] font-normal tracking-normal focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  ),
);
FastField.displayName = "FastField";

export const FastLight = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <div className={cn("space-y-1", { hidden: props.hidden })}>
      <div className="flex h-[48px]">
        <section className="flex h-12 items-center">
          <div className="absolute z-40 flex w-fit items-center py-0.5 pl-2.5 pr-3.5">
            <div className="flex items-center">
              <span
                className={cn(
                  "font-inter text-sm tracking-tighter dark:text-primary-800",
                  { "opacity-60": props.disabled },
                )}
              >
                {props.title}
              </span>
              {props.required ? (
                <AsteriskIcon
                  className={cn(
                    "-mr-2 -mt-1 ml-0.5 size-4 text-danger-400 dark:text-danger-600",
                    {
                      "opacity-50": props.disabled,
                    },
                  )}
                />
              ) : (
                "  "
              )}
            </div>
          </div>
        </section>
        <Input
          ref={ref}
          name={props.name}
          id={props.name}
          disabled={props.disabled}
          defaultValue={props.value}
          className={cn(
            "font-arc h-[48px] ps-36 text-foreground shadow-primary-50 drop-shadow-lg",
            "rounded-md border border-dotted border-primary-400 dark:border-primary-500",
            "bg-slate-300/15 tracking-wide dark:bg-primary-100/80",
            className,
          )}
          type={type}
        />
      </div>
    </div>
  ),
);
FastLight.displayName = "FastLight";

interface FieldGroupProps {
  group: string;
  items: RequestFields[];
}
export const FastFieldGroup = forwardRef<
  HTMLInputElement,
  InputProps & FieldGroupProps
>(({ className, type, ...props }, ref) => (
  <div
    className={cn(
      "w-full overflow-hidden rounded-md border border-primary-200 bg-slate-300/15 dark:border-primary-300",
      {
        hidden: props.hidden,
      },
    )}
  >
    <div className="full flex h-8 items-center border-b-[0.33px] border-dotted border-primary-300 px-2 font-inter text-xs font-semibold tracking-tight text-primary-800">
      {props.group}
    </div>
    <div className="flex w-full">
      {props.items.map((item) => (
        <div
          key={item.name}
          className="flex h-[48px] w-full border-r-[0.33px] border-dashed border-primary-400/60 last:border-r-0"
        >
          <section className="relative flex h-12 items-center">
            <div className="flex h-full w-fit items-center bg-background">
              <div className="flex items-center px-2">
                <span
                  className={cn(
                    "mt-[1.5px] font-inter text-xs capitalize tracking-tighter dark:text-primary-800",
                    { "opacity-60": item.disabled },
                  )}
                >
                  {item.title}
                </span>
                {item.required ? (
                  <AsteriskIcon
                    className={cn(
                      "-mr-2 -mt-1 ml-0.5 size-4 text-danger-400 dark:text-danger-600",
                      {
                        "opacity-50": item.disabled,
                      },
                    )}
                  />
                ) : (
                  "  "
                )}
              </div>
            </div>
          </section>
          <Input
            ref={ref}
            {...item}
            id={item.name}
            className={cn(
              "font-arc tracking-wide text-foreground placeholder:text-xs",
              "h-[48px] bg-background",
              "ring-offset-primary-300 focus-visible:ring-offset-0",
              className,
            )}
            type={type}
          />
        </div>
      ))}
    </div>
  </div>
));
FastFieldGroup.displayName = "FastFieldGroup";

export const FastFile = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex size-full flex-col items-center justify-center space-y-1 rounded-xl border border-dashed border-primary-300 bg-background",
          className,
        )}
      >
        <PhotoIcon className="size-8 stroke-1 text-primary-500" />
        <p className="font-arc text-xs opacity-80">
          {props.placeholder ?? "Drag & drop image or click here."}
        </p>

        <input
          {...props}
          ref={ref}
          type={`file`}
          accept="application/pdf, image/*"
          className="absolute z-50 flex size-full w-full cursor-pointer border bg-transparent opacity-0 focus-visible:outline-none"
        />
      </div>
    );
  },
);
FastFile.displayName = "FastFile";

export const InputFieldName = forwardRef<
  HTMLInputElement,
  InputProps & { label: string | undefined; index: number }
>(({ className, type, label, index, ...props }, ref) => {
  return (
    <div
      className={cn(
        "focus-within:ring-ring border-ash flex h-16 items-center rounded-xl border-[0.0px] bg-white pr-[3px] ring-offset-blue-400 focus-within:ring-1 focus-within:ring-offset-1 dark:bg-indigo-200/20",
        className,
      )}
    >
      <p className="text-clay/60 mx-4 text-xs">{index + 1}</p>
      <span className="text-clay w-64 text-xs font-medium uppercase leading-none">
        {label}
      </span>

      <input
        {...props}
        type={type}
        ref={ref}
        className="shadow-i-br-lg/80 border-ash bg-paper m-1 w-full rounded-lg border-0 p-3 font-mono text-[15px] uppercase tracking-widest text-zinc-600 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFieldName.displayName = "InputFieldName";
