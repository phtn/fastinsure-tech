import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ReactElement,
  type InputHTMLAttributes,
  useMemo,
} from "react";
import { LoaderCircle } from "lucide-react";
import { type DualIcon } from "@/app/types";
import { mapUnion, passwordSecure } from "@/utils/helpers";
import { useThemeCtx } from "@/app/ctx/theme";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full bg-background/5 px-3 py-2 text-sm ring-offset-primary-700 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
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
