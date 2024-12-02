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
          "pointer-events-none absolute size-1 text-transparent opacity-5",
          "transition-all duration-200 transform-gpu",
          "group-hover:opacity-100",
          { "group-hover:size-8": size === "sm" },
          { "group-hover:size-9": size === "md" },
          { "group-hover:size-[42px]": size === "lg" },
          "fill-god/80",
          "dark:fill-primary-300/50",
        )}
      />
      <span className="z-[40] text-icon group-hover:opacity-100 dark:text-icon-dark">
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
  const { size = "md", isLoading = false } = props;
  const Opts = useCallback(() => {
    const options = opts(
      <Spinner size="sm" />,
      <props.icon
        className={cn(
          "z-40 size-4 stroke-[1.5px]",
          "group-hover:drop-shadow-md",
          { "size-5": size === "md" },
          { "size-6": size === "lg" },
          "text-icon",
          "dark:text-icon-dark",
        )}
      />,
    );
    return <>{options.get(isLoading)}</>;
  }, [isLoading, size, props]);

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
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute size-1 text-transparent opacity-5",
          "transition-all duration-200 transform-gpu",
          "group-hover:opacity-100",
          { "group-hover:size-8": size === "sm" },
          { "group-hover:size-9": size === "md" },
          { "group-hover:size-[42px]": size === "lg" },
          "fill-god/80",
          "dark:fill-primary-300/50",
        )}
      />
      <Opts />
    </button>
  );
};
