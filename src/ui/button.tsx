import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  type ButtonHTMLAttributes,
  type RefObject,
  useCallback,
  useState,
} from "react";
import { Button as B } from "@nextui-org/react";
import { type DualIcon } from "@/app/types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: RefObject<HTMLButtonElement>;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
};

export function ButtonTransform() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Button
      className="group"
      variant="outline"
      size="icon"
      onClick={() => setOpen((prevState) => !prevState)}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <svg
        className="pointer-events-none"
        width={16}
        height={16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 12L20 12"
          className="origin-center transition-all duration-300 -translate-y-[7px] [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
        />
        <path
          d="M4 12H20"
          className="origin-center transition-all duration-300 translate-y-[7px] [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
        />
      </svg>
    </Button>
  );
}

export const ConfirmButton = (props: {
  label: string;
  icon?: DualIcon;
  confirmFn: VoidFunction;
}) => {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => {
    setReady(true);
  }, [setReady]);
  const handleNotReady = useCallback(() => {
    setReady(false);
  }, [setReady]);
  return (
    <div
      onMouseLeave={handleNotReady}
      className="_border relative flex h-[4.5rem] w-fit flex-col justify-between overflow-hidden border-secondary/50"
    >
      <div className="flex items-center justify-center space-x-2">
        <B
          size="sm"
          variant="flat"
          color="primary"
          onPress={handleNotReady}
          className={cn(
            "border-primary-200/60 text-primary",
            "hidden w-fit border-[1.5px] bg-primary-50 font-medium opacity-0",
            "transition-all duration-300 ease-out transform-gpu",
            {
              "flex animate-enter opacity-100 hover:border-primary-100/80 hover:bg-primary-100/80 hover:text-secondary":
                ready,
            },
          )}
        >
          Cancel
        </B>
        <B
          size="sm"
          variant="flat"
          color="primary"
          onPress={props.confirmFn}
          className={cn(
            "border-primary-200/60 text-danger",
            "hidden w-fit border-[1.5px] bg-primary-50 font-medium opacity-0",
            "transition-all duration-200 ease-out transform-gpu",
            {
              "flex animate-enter opacity-100 hover:border-danger hover:bg-danger hover:text-chalk":
                ready,
            },
          )}
        >
          Yes
        </B>
      </div>
      <B
        size="sm"
        variant="flat"
        color="primary"
        className={cn(
          "min-w-36 border-[1.5px] bg-primary-50 font-medium hover:bg-danger hover:text-chalk",
          "space-x-2 border-danger/80 text-danger",
          {
            "border-primary-100/80 text-foreground hover:bg-primary-100/80 hover:text-foreground":
              ready,
          },
          { capitalize: !ready },
        )}
        onPress={handleReady}
      >
        {ready ? (
          <ExclamationTriangleIcon className="size-4 stroke-primary stroke-1 text-warning drop-shadow-md dark:stroke-void" />
        ) : props.icon ? (
          <props.icon className="size-4" />
        ) : null}
        <span>{ready ? "Are you sure?" : props.label}</span>
      </B>
    </div>
  );
};
