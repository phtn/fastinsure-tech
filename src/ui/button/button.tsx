import { type DualIcon } from "@/app/types";
import { Button, Spinner, type ButtonProps } from "@nextui-org/react";
import { Squircle } from "lucide-react";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { opts } from "@/utils/helpers";

interface ButtStatProps {
  value?: string;
  size?: "sm" | "md" | "lg";
}
export const ButtStat = (props: ButtStatProps) => {
  const { value = "", size = "md" } = props;
  return (
    <div
      className={cn(
        "group relative flex cursor-pointer items-center justify-center overflow-hidden",
        "transition-all duration-200 transform-gpu",
        "active:scale-90",
        { "size-8": size === "sm" },
        { "size-10": size === "md" },
        { "size-12": size === "lg" },
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute text-transparent opacity-100",
          "transition-all duration-200 transform-gpu",
          "group-hover:opacity-100",
          { "size-8": size === "sm" },
          { "size-9": size === "md" },
          { "size-[42px]": size === "lg" },
          "fill-god/80",
          "dark:fill-primary-300/50",
        )}
      />
      <span className="z-[40] font-semibold text-icon group-hover:opacity-100 dark:text-icon-dark">
        {value}
      </span>
    </div>
  );
};
export const ButtIcx = (props: ButtonProps & { icon: DualIcon }) => {
  return (
    <div>
      <Button isIconOnly className="bg-god">
        <props.icon className="size-4" />
      </Button>
    </div>
  );
};

export const ButtSqx = (props: ButtonProps & { icon: DualIcon }) => {
  const {
    size = "md",
    isLoading = false,
    variant = "goddess",
    disabled,
    className,
  } = props;
  const Opts = useCallback(() => {
    const options = opts(
      <Spinner size="sm" />,
      <props.icon
        className={cn(
          "z-40 size-4 stroke-[1.5px]",
          "group-hover:drop-shadow-md",
          "text-icon",
          "dark:text-icon-dark",
          { "size-5": size === "md" },
          { "size-6": size === "lg" },
          { "text-icon/50 dark:text-icon-dark/50": disabled },
        )}
      />,
    );
    return <>{options.get(isLoading)}</>;
  }, [isLoading, size, props, disabled]);

  return (
    <button
      onClick={props.onClick}
      className={cn(
        "group relative flex cursor-pointer items-center justify-center overflow-hidden",
        "transition-all duration-200 transform-gpu",
        "active:scale-90",
        { "size-8": size === "sm" },
        { "size-10": size === "md" },
        { "size-12": size === "lg" },
        "focus:-ring-offset-1 focus:size-6 focus:rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary",
        className,
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute size-1 text-transparent opacity-5",
          "transition-all duration-200 transform-gpu",
          "group-hover:opacity-100",
          { "group-hover:size-8": size === "sm" },
          { "group-hover:size-[44px]": size === "md" },
          { "group-hover:size-[48px]": size === "lg" },
          "fill-god/80",
          { "fill-demigod/80": variant === "solid" },
          "dark:fill-primary-300/30",
        )}
      />
      <Opts />
    </button>
  );
};

export const ButtSpc = (props: ButtonProps & { icon: DualIcon }) => {
  const {
    size = "md",
    isLoading = false,
    variant = "goddess",
    disabled,
    className,
  } = props;
  const Opts = useCallback(() => {
    const options = opts(
      <Spinner size="sm" />,
      <props.icon
        className={cn(
          "z-40 size-4 stroke-[1.5px]",
          "group-hover:drop-shadow-md",
          "fill-chalk text-icon",
          "dark:fill-void dark:text-icon-dark",
          { "size-5": size === "md" },
          { "size-6": size === "lg" },
          { "text-icon/50 dark:text-icon-dark/50": disabled },
        )}
      />,
    );
    return <>{options.get(isLoading)}</>;
  }, [isLoading, size, props, disabled]);

  return (
    <button
      onClick={props.onClick}
      className={cn(
        "group/butt relative flex animate-enter cursor-pointer items-center justify-center overflow-hidden p-[2.5px]",
        "transition-all duration-200 transform-gpu",
        "active:scale-90",
        { "size-8": size === "sm" },
        { "size-10": size === "md" },
        { "size-12": size === "lg" },
        "focus:-ring-offset-1 focus:size-6 focus:rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary",
        className,
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute size-1 text-transparent opacity-5",
          "border-demigod transition-all duration-200 transform-gpu",
          "group-hover/butt:opacity-100",
          { "group-hover/butt:size-[28px]": size === "sm" },
          { "group-hover/butt:size-[44px]": size === "md" },
          { "group-hover/butt:size-[48px]": size === "lg" },
          "fill-god/80",
          { "fill-demigod/80": variant === "solid" },
          "dark:fill-primary-300/30",
        )}
      />
      <Opts />
    </button>
  );
};
