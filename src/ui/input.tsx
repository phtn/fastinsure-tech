import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import {
  copyFn,
  mapUnion,
  opts,
  passwordSecure,
  pasteFn,
} from "@/utils/helpers";
import {
  ClipboardIcon,
  EyeIcon,
  EyeSlashIcon,
  LockOpenIcon,
  Square2StackIcon,
} from "@heroicons/react/24/outline";
import { BoltIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { AsteriskIcon } from "lucide-react";
import {
  type FormEvent,
  forwardRef,
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";

import { type InsertFields } from "@/app/dashboard/request/create/forms/fields";
import type { InsertAuto } from "@convex/autos/d";
import type { InsertAddress } from "convex/address/d";
import type { InsertSubject } from "convex/subjects/d";
import type { FieldValues, UseFormRegister } from "react-hook-form";
import { ButtSpc, ButtSqx } from "./button/button";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: DualIcon;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex w-full bg-background/5 px-3 py-2 text-sm ring-offset-primary-400 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-xs placeholder:text-slate-400/90 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:border-dashed disabled:bg-slate-300/20 disabled:opacity-50 disabled:drop-shadow-md",
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
    // const [mask, setMask] = useState<string>("");
    // const [chmap, setChmap] = useState<number[]>([]);
    // const [userInput, setUserInput] = useState("");

    const toggleSecure = () => setSecure((prev) => !prev);

    const inputType = useMemo(
      () => passwordSecure(props.name ?? "password", secure),
      [secure, props.name],
    );
    const IconOptions = useCallback(() => {
      const iconclass = "size-5 shrink-0 text-[#1b1f22]/50";
      const options = opts(
        <EyeSlashIcon className={iconclass} />,
        <EyeIcon className={iconclass} />,
      );
      return <>{options.get(secure)}</>;
    }, [secure]);

    const StartContent = useCallback(
      (prop: { className?: ClassName }) => {
        const StartIcon = (icon: { className?: ClassName }) => {
          if (props.icon) {
            return <props.icon className={icon.className} />;
          }
        };
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
    //● ●⏺⬤⬢●

    // const chars =
    //   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";
    // const createCharMap = () => {
    //   return chars.split("").reduce(
    //     (acc, char) => {
    //       acc[char] = "●"; // Using a larger circle character
    //       return acc;
    //     },
    //     {} as Record<string, string>,
    //   );
    // };
    // const handlePasswordChange = useCallback(
    //   (e: ChangeEvent<HTMLInputElement>) => {
    //     let charlist: string[] = [];
    //     if (e.currentTarget.id === "password") {
    //       const r = e.target.value;
    //       if (!secure) {
    //         charlist = r.split("");
    //         if (charlist.length > 0) {
    //           const last = charlist[charlist.length - 1];
    //           if (last) {
    //             setChmap((prev) => [...prev, chars.indexOf(last)]);
    //           }
    //           setMask("●".repeat(chmap.length));
    //         }
    //       }
    //     }
    //   },
    //   [secure, chmap.length],
    // );

    // const handlePrintMap = () => {
    //   const char = chmap.map((e) => chars.charAt(e));
    //   console.table([...chmap, ...char]);
    //   console.log(mask);
    // };

    // const handleUserInput = useCallback(
    //   (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.currentTarget.id === "password") {
    //       const r = e.target.value;
    //       if (!secure) {
    //         setUserInput((prev) => prev + r);
    //       }
    //     }
    //   },
    //   [secure],
    // );

    // const charlist = chars.split("");
    // const printCollection = useCallback(() => {
    //   if (userInput) {
    //     const data = userInput.split("").map((ch, idx) => ({
    //       idx,
    //       pos: charlist.indexOf(ch) + 1,
    //       ch,
    //     }));
    //     console.table(data);
    //   }
    // }, [charlist, userInput]);

    return (
      <div className="w-full space-y-0">
        <div className="relative w-full">
          <Input
            id={props.name}
            ref={ref}
            type={inputType}
            value={props.value}
            name={props.name}
            onChange={props.onChange}
            placeholder={props.placeholder}
            className={cn(
              className,
              classNames,
              "w-full rounded-none bg-background",
            )}
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
              {props.name === "password" ? (
                <Button
                  isIconOnly
                  variant="flat"
                  className={cn(
                    "rounded-full border-0 bg-transparent hover:bg-transparent",
                  )}
                  onPress={toggleSecure}
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
        "flex h-[50px] w-full items-center pl-3 ps-2 focus:bg-adam/40",
        className,
      )}
    >
      {props.icon ? (
        <props.icon className="ml-2 size-5 shrink-0 stroke-1 text-primary dark:text-chalk/40" />
      ) : null}

      <input
        {...props}
        type={type}
        ref={ref}
        className="placeholder:text-clay/50 h-[42px] w-full rounded-md bg-transparent px-2 ps-4 font-sans text-[16px] font-normal tracking-normal text-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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

type GroupFields =
  | InsertFields<InsertSubject>[]
  | InsertFields<InsertAddress>[]
  | InsertFields<InsertAuto>[];
interface FieldGroupProps {
  group: string;
  items: GroupFields;
  register: UseFormRegister<FieldValues>;
}
export const FastFieldGroup = forwardRef<
  HTMLInputElement,
  InputProps & FieldGroupProps
>(({ className, ...props }, ref) => {
  const paste = useCallback(
    (id: string) => async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await pasteFn(id);
    },
    [],
  );
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-primary-200 bg-primary-200/70 shadow-sm transition-all duration-300 ease-out transform-gpu hover:shadow-md dark:border-primary-300 dark:bg-primary-100",
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
                      "mt-[1.5px] font-inter text-xs capitalize tracking-tighter text-icon dark:text-icon-dark",
                      { "opacity-60": item.disabled },
                    )}
                  >
                    {item.title}
                  </span>
                  {item.required ? (
                    <AsteriskIcon
                      className={cn("-mr-2 -mt-1 ml-0.5 size-4 text-danger", {
                        "opacity-50": item.disabled,
                      })}
                    />
                  ) : (
                    "  "
                  )}

                  {item.hint ? (
                    <BoltIcon
                      className={cn("-mr-2 -mt-1 ml-0.5 size-4 text-success", {
                        "opacity-50": item.disabled,
                      })}
                    />
                  ) : null}
                </div>
              </div>
            </section>
            <div className="group relative flex w-full">
              <Input
                {...props.register(item.name)}
                {...item}
                className={cn(
                  "h-[48px] bg-background",
                  "font-arc font-medium tracking-wide text-foreground placeholder:text-xs dark:text-secondary-200",
                  "ring-offset-primary-300 focus-visible:ring-offset-0",
                  className,
                )}
                ref={ref}
              />
              <ButtSpc
                size="sm"
                icon={ClipboardIcon}
                onClick={paste(item.name)}
                className="absolute right-1 top-1 z-[50] hidden size-fit group-hover:flex"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
FastFieldGroup.displayName = "FastFieldGroup";

interface FieldGroupIIProps {
  group: string;
  changeFn?: (e: ChangeEvent<HTMLInputElement>) => void;
  changeField?: keyof InsertAddress;
  register: UseFormRegister<FieldValues>;
  listOne: GroupFields;
  listTwo: GroupFields;
}
export const FastFieldGroupII = (props: FieldGroupIIProps & InputProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-primary-200 bg-primary-200/70 shadow-sm transition-all duration-300 ease-out transform-gpu hover:shadow-md dark:border-primary-300 dark:bg-primary-100",
        {
          hidden: props.hidden,
        },
      )}
    >
      <div className="full flex h-10 items-center border-b-[0.33px] border-primary-300 px-2 font-inter text-sm font-semibold tracking-tighter text-primary-800">
        {props.group}
      </div>
      <RenderInputList data={props.listOne} {...props} />
      <RenderInputList data={props.listTwo} {...props} />
    </div>
  );
};
const RenderInputList = (props: {
  register: UseFormRegister<FieldValues>;
  data: GroupFields;
  className?: ClassName;
  changeFn?: (e: ChangeEvent<HTMLInputElement>) => void;
  changeField?: keyof InsertAddress;
}) => {
  const { className, data, register, changeFn, changeField } = props;
  const paste = useCallback(
    (id: string) => async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await pasteFn(id);
    },
    [],
  );
  return (
    <div className="flex w-full border-b-[0.33px] border-primary-300">
      {data.map((item) => {
        return (
          <div
            key={item.name}
            className="flex h-[48px] w-full border-r-[0.33px] border-primary-400/60 last:border-r-0"
          >
            <section className="relative flex h-12 items-center">
              <div className="flex h-full w-fit items-center bg-background">
                <div className="flex items-center px-2">
                  <span
                    className={cn(
                      "mt-[1.5px] font-inter text-xs capitalize tracking-tighter text-icon dark:text-icon-dark",
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
                  ) : null}
                  {item.hint ? (
                    <BoltIcon
                      className={cn("-mr-2 -mt-1 ml-0.5 size-4 text-success", {
                        "opacity-50": item.disabled,
                      })}
                    />
                  ) : null}
                </div>
              </div>
            </section>
            <div className="group relative flex w-full">
              <Input
                id={item.name}
                type={item.type}
                placeholder={item.placeholder}
                className={cn(
                  "flex h-[48px] w-full bg-background",
                  "font-arc font-medium tracking-wide text-foreground dark:text-secondary-400",
                  "placeholder:font-normal dark:placeholder:opacity-50",
                  "ring-offset-primary-300 focus-visible:ring-offset-0",
                  className,
                  {
                    "w-60":
                      item.name.startsWith("owner") ||
                      item.name.startsWith("mvfile") ||
                      item.name.startsWith("series") ||
                      item.name.startsWith("chassis"),
                  },
                )}
                {...register(item.name, {
                  onChange:
                    item.name === changeField ? changeFn : () => undefined,
                  required: item.required,
                })}
              />
              <ButtSpc
                size="sm"
                icon={ClipboardIcon}
                onClick={paste(item.name)}
                className="absolute right-1 top-1 z-[50] hidden size-fit group-hover:flex"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface FieldGroupIIIProps {
  group: string;
  description?: string;
  register: UseFormRegister<FieldValues>;
  listOne: GroupFields;
  listTwo: GroupFields;
}

export const FastFieldGroupIII = (props: FieldGroupIIIProps & InputProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-primary-200 bg-primary-200/70 shadow-sm transition-all duration-300 ease-out transform-gpu hover:shadow-md dark:border-primary-300 dark:bg-primary-100",
        {
          hidden: props.hidden,
        },
      )}
    >
      <div className="full flex h-10 items-center border-b-[0.33px] border-primary-300 px-2 font-inter text-sm font-semibold tracking-tighter text-primary-800">
        <span>{props.group}</span>
        <span className="ps-4 text-xs font-normal">{props.description}</span>
      </div>
      <RenderInputIII data={props.listOne} {...props} />
      <RenderInputIII data={props.listTwo} {...props} />
    </div>
  );
};

const RenderInputIII = (props: {
  register: UseFormRegister<FieldValues>;
  data: GroupFields;
  className?: ClassName;
}) => {
  const { className, data, register } = props;
  const paste = useCallback(
    (id: string) => async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await pasteFn(id);
    },
    [],
  );

  const RequiredOptions = useCallback(
    (p: { required: boolean | undefined; disabled: boolean | undefined }) => {
      const options = opts(
        <AsteriskIcon
          className={cn(
            "-mr-2 -mt-1 ml-0.5 size-4 text-danger-400 dark:text-danger-600",
            {
              "opacity-50": p.disabled,
            },
          )}
        />,
        null,
      );
      return <>{options.get(!!p.required)}</>;
    },
    [],
  );

  const HyperOptions = useCallback(
    (p: { disabled: boolean | undefined; hint: string | undefined }) => {
      const options = opts(
        <BoltIcon
          className={cn("-mr-2 -mt-1 ml-0.5 size-4 text-success", {
            "opacity-50": p.disabled,
          })}
        />,
        null,
      );
      return <>{options.get(!!p.hint)}</>;
    },
    [],
  );

  return (
    <div className="flex w-full border-b-[0.33px] border-primary-300">
      {data.map((item) => {
        const { ref, name, onBlur, onChange } = register(item.name);
        return (
          <div
            key={item.name}
            className="flex h-[48px] w-full border-r-[0.33px] border-primary-400/60 last:border-r-0"
          >
            <section className="relative flex h-12 items-center">
              <div className="flex h-full w-fit items-center bg-background">
                <div className="flex items-center px-2">
                  <span
                    className={cn(
                      "mt-[1.5px] font-inter text-xs capitalize tracking-tighter text-icon dark:text-icon-dark",
                      { "opacity-60": item.disabled },
                    )}
                  >
                    {item.title}
                  </span>
                  <RequiredOptions
                    disabled={item.disabled}
                    required={item.required}
                  />
                  <HyperOptions disabled={item.disabled} hint={item.hint} />
                </div>
              </div>
            </section>
            <div className="group relative flex w-full">
              <Input
                ref={ref}
                id={name}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                type={item.type}
                placeholder={item.placeholder}
                className={cn(
                  "flex h-[48px] w-full bg-background",
                  "font-arc font-medium tracking-wide text-foreground dark:text-secondary-400",
                  "placeholder:font-normal dark:placeholder:opacity-50",
                  "ring-offset-primary-300 focus-visible:ring-offset-0",
                  className,
                  {
                    "w-64":
                      name.startsWith("owner") ||
                      name.startsWith("mvfile") ||
                      item.name.startsWith("model") ||
                      name.startsWith("chassis"),
                  },
                )}
              />
              <ButtSpc
                size="sm"
                icon={ClipboardIcon}
                onClick={paste(item.name)}
                className="absolute right-1 top-1 z-[50] hidden size-fit group-hover:flex"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const FastFieldGroupIV = forwardRef<
  HTMLInputElement,
  InputProps & FieldGroupIIProps
>(({ className, type, ...props }, ref) => (
  <div
    className={cn(
      "w-full overflow-hidden rounded-lg border border-primary-200 bg-primary-200/70 shadow-sm transition-all duration-300 ease-out transform-gpu hover:shadow-md dark:border-primary-300 dark:bg-primary-100",
      {
        hidden: props.hidden,
      },
    )}
  >
    <div className="full flex h-10 items-center border-b-[0.33px] border-dotted border-primary-300 px-2 font-inter text-sm font-semibold tracking-tighter text-primary-800">
      {props.group}
    </div>
    <div className="flex w-full border-b-[0.33px] border-dotted border-primary-300">
      {props.listOne.map((item) => (
        <div
          key={item.name}
          className="flex h-[48px] w-full border-r-[0.33px] border-dashed border-primary-400/60 last:border-r-0"
        >
          <section className="relative flex h-12 items-center">
            <div className="flex h-full w-fit items-center bg-background">
              <div className="flex items-center px-2">
                <span
                  className={cn(
                    "mt-[1.5px] font-inter text-xs capitalize tracking-tighter text-foreground/80 dark:text-primary-800",
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
            {...item}
            id={item.name}
            {...props.register(item.name)}
            // ref={ref}
            className={cn(
              "h-[48px] bg-background",
              "font-arc font-medium tracking-wide text-foreground placeholder:font-normal dark:text-secondary-100",
              "ring-offset-primary-300 focus-visible:ring-offset-0",
              className,
            )}
            type={type}
            ref={ref}
          />
        </div>
      ))}
    </div>
    <div className="flex w-full">
      {props.listTwo.map((item) => (
        <div
          key={item.name}
          className="flex h-[48px] w-full border-r-[0.33px] border-dashed border-primary-400/60 last:border-r-0"
        >
          <section className="relative flex h-12 items-center">
            <div className="flex h-full w-fit items-center bg-background">
              <div className="flex items-center px-2">
                <span
                  className={cn(
                    "mt-[1.5px] font-inter text-xs capitalize tracking-tighter text-foreground/80 dark:text-primary-800",
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
            {...item}
            {...props.register(item.name)}
            // ref={ref}
            onChange={
              item.name === props.changeField ? props.changeFn : props.onChange
            }
            className={cn(
              "h-[48px] bg-background placeholder:font-normal",
              "font-arc font-medium tracking-wide text-foreground dark:text-secondary-100",
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
FastFieldGroupIV.displayName = "FastFieldGroupIII";

export const FastFile = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex size-full flex-col items-center justify-center space-y-1 rounded-xl border-[0.33px] border-dashed border-primary-400 bg-primary-100 shadow-sm shadow-primary-200 transition-all duration-300 ease-out transform-gpu hover:shadow-sm",
          className,
        )}
      >
        <PhotoIcon className="size-8 stroke-1 text-primary-500" />
        <p className="font-inst text-sm font-light opacity-80">
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
  const handleCopyValue = useCallback(
    async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      await copyFn({
        name: props.defaultValue as string,
        text: props.defaultValue as string,
      });
    },
    [props.defaultValue],
  );
  return (
    <div
      className={cn(
        "focus-within:ring-ring group flex h-fit flex-col border-b-[0.33px] border-primary-300 bg-transparent pr-[3px] pt-2 ring-offset-primary-300 focus-within:ring-0 focus-within:ring-offset-1",
        className,
      )}
    >
      <section className="flex h-10 w-full items-center justify-between">
        <div className="flex items-center space-x-4 px-3">
          <p className="text-xs text-primary-500">{index + 1}</p>
          <span className="font-inter text-xs capitalize leading-none tracking-tighter opacity-60">
            {label}
          </span>
        </div>
        <div>
          <ButtSqx
            size="sm"
            icon={Square2StackIcon}
            onClick={handleCopyValue}
            className="hidden border-0 group-hover:flex"
          />
        </div>
      </section>

      <input
        {...props}
        type={type}
        ref={ref}
        className="w-full bg-transparent p-3 ps-8 font-jet uppercase tracking-widest text-foreground/80 placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
  );
});
InputFieldName.displayName = "InputFieldName";
