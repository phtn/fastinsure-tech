import { cn } from "@/lib/utils";
import {
  forwardRef,
  type InputHTMLAttributes,
  useMemo,
  useState,
  useCallback,
} from "react";
import { AsteriskIcon, LoaderCircle } from "lucide-react";
import type { ClassName, DualIcon } from "@/app/types";
import { mapUnion, opts, passwordSecure, toggleState } from "@/utils/helpers";
import type { RequestFields } from "@/app/[uid]/requests/[...slug]/forms/create";
import {
  EyeIcon,
  EyeSlashIcon,
  LockOpenIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: DualIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex w-full bg-background/5 px-3 py-2 text-sm ring-offset-primary-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:border-dashed disabled:bg-slate-300/20 disabled:opacity-50 disabled:drop-shadow-md",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";
type InputSize = "xs" | "sm" | "md" | "lg" | "xl" | "none";

export interface InputFieldProps extends Omit<InputProps, "size"> {
  start?: DualIcon | null;
  loading?: boolean;
  sz?: InputSize;
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

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => {
    const [secure, setSecure] = useState(false);

    const toggleSecure = () => toggleState(setSecure);

    const inputType = useMemo(
      () => passwordSecure(props.name!, secure),
      [secure, props.name],
    );
    const IconOptions = useCallback(() => {
      const iconclass = "size-5 shrink-0 text-primary";
      const options = opts(
        <EyeSlashIcon className={iconclass} />,
        <EyeIcon className={iconclass} />,
      );
      return <>{options.get(secure)}</>;
    }, [secure]);

    const StartContent = useCallback(
      (prop: { className?: ClassName }) => {
        const StartIcon = (icon: { className?: ClassName }) =>
          props.icon &&
          ((<props.icon className={icon.className} />) as JSX.Element);
        const isPassword = props.name === "password" && !secure;
        const options = opts(
          <LockOpenIcon className={prop.className} />,
          <StartIcon className={prop.className} />,
        );
        return <>{options.get(isPassword)}</>;
      },
      [secure, props],
    );

    const classNames = useMemo(
      () =>
        cn(
          "peer ps-12 text-lg font-inst",
          inputSizes.get(props.sz ?? "sm"),
          inputRadius.get(props.sz ?? "sm"),
          { "tracking-widest": props.name === "password" && secure },
        ),
      [props.sz, secure, props.name],
    );
    //● ⏺⬤⬢

    // const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   if (e.currentTarget.id === "password") {
    //     const raw = e.target.value;
    //     const count = raw.length;
    //     const value = !secure ? e.target.value : pval;
    //     setPval(value);
    //     const dots = "●".repeat(count);
    //     setMask(dots);
    //   }
    // };

    return (
      <div className="space-y-0">
        <div className="relative">
          <Input
            ref={ref}
            id={props.name}
            type={inputType}
            value={props.value}
            name={props.name}
            security="●"
            onChange={props.onChange}
            placeholder={props.placeholder}
            {...props}
            className={cn("bg-primary-300 text-primary", className, classNames)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-1 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            {props.start ? (
              <StartContent className="size-5 stroke-[1.5px] text-primary opacity-70" />
            ) : null}
          </div>
          <div
            className="focus-visible:border-ring focus-visible:ring-ring/30 absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg ring-offset-background transition-shadow hover:text-foreground focus-visible:border focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={"end-icon"}
          >
            <div className="absolute inset-y-0 flex items-center justify-center pe-3 text-primary peer-disabled:opacity-50">
              {props.loading ? (
                <LoaderCircle
                  className="animate-spin"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  role="presentation"
                />
              ) : props.name === "password" ? (
                <Button
                  isIconOnly
                  variant="flat"
                  className={cn(
                    "rounded-full border-0 bg-transparent hover:bg-transparent",
                    className,
                  )}
                  onClick={toggleSecure}
                >
                  <IconOptions />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
InputField.displayName = "InputField";

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
      "w-full overflow-hidden rounded-md border border-primary-200 bg-slate-300/15 shadow-sm shadow-primary-200 transition-all duration-300 ease-out transform-gpu hover:shadow-md dark:border-primary-300",
      {
        hidden: props.hidden,
      },
    )}
  >
    <div className="full flex h-10 items-center border-b-[0.33px] border-dotted border-primary-300 px-2 font-inter text-sm font-semibold tracking-tighter text-primary-800">
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
          "relative flex size-full flex-col items-center justify-center space-y-1 rounded-xl border border-dashed border-primary-300 bg-background shadow-sm shadow-primary-200 transition-all duration-300 ease-out transform-gpu hover:shadow-sm",
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
