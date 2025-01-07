"use client";

import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import { opts } from "@/utils/helpers";
import type {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from "react";
import { useCallback, useEffect, useState } from "react";
import type { ButtSize } from "./types";
import { Spinner } from "@nextui-org/react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rippleColor?: string;
  duration?: string;
  start?: DualIcon;
  end?: DualIcon;
  inverted?: boolean;
  loading?: boolean;
  size?: ButtSize;
  ref?: RefObject<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: "default" | "secondary" | "danger" | "success";
}

export const ButtSex = ({
  rippleColor = "transparent",
  inverted = false,
  loading = false,
  size = "sm",
  variant = "default",
  className,
  disabled,
  children,
  onClick,
  start,
  end,
  ref,
  type,
  ...props
}: ButtonProps) => {
  const [buttonRipples, setButtonRipples] = useState<
    Array<{ x: number; y: number; size: number; key: number }>
  >([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (type !== "submit") {
      event.preventDefault();
    }
    createRipple(event);
    onClick?.(event);
  };

  const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = { x, y, size, key: Date.now() };
    setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
  };

  useEffect(() => {
    if (buttonRipples.length > 0) {
      const lastRipple = buttonRipples[buttonRipples.length - 1];
      const timeout = setTimeout(() => {
        setButtonRipples((prevRipples) =>
          prevRipples.filter((ripple) => ripple.key !== lastRipple?.key),
        );
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [buttonRipples]);

  const Icon = useCallback(
    (props: { icon: DualIcon; loading: boolean }) =>
      (loading ? (
        <Spinner size="sm" color={inverted ? "warning" : "primary"} />
      ) : (
        <props.icon
          className={cn(
            "stroke-1 text-void/90 dark:text-icon-dark",
            "group-hover:text-void dark:group-hover:text-chalk",
            {
              "size-3": size === "sm",
              "size-4": size === "md",
              "size-6": size === "lg",
            },
            {
              "text-chalk group-hover:text-white dark:text-void/80": inverted,
              "dark:group-hover:text-void": inverted,
            },
            {
              "stroke-1 text-void group-hover:text-chalk":
                variant === "secondary",
            },
          )}
        />
      )) as ReactElement,
    [inverted, size, loading, variant],
  );

  const StartOption = useCallback(() => {
    const options = opts(<Icon loading={loading} icon={start!} />, null);
    return <>{options.get(!!start)}</>;
  }, [start, Icon, loading]);

  const EndOption = useCallback(() => {
    const options = opts(<Icon loading={loading} icon={end!} />, null);
    return <>{options.get(!!end)}</>;
  }, [end, Icon, loading]);

  return (
    <Container size={size} inverted={inverted} disabled={disabled}>
      <button
        disabled={disabled ?? loading}
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden",
          "rounded-lg border",
          "border-primary/40 bg-goddess group-hover:bg-white",
          "dark:bg-void dark:group-hover:bg-void",
          "dark:border-primary-500/40 dark:group-hover:border-primary-500/50",
          "dark:shadow-secondary dark:group-hover:drop-shadow-md",
          "cursor-pointer text-center text-primary active:scale-[99%]",
          "transition-all duration-300 transform-gpu",
          {
            "bg-void dark:bg-primary": inverted,
            "dark:border-void/60 dark:group-hover:border-void/80": inverted,
            "group-hover:bg-void dark:group-hover:bg-white": inverted,
            "h-8 gap-2 rounded-lg px-2 py-1.5": size === "sm",
            "h-10 gap-2.5 rounded-xl px-2.5 py-2": size === "md",
            "h-14 gap-2.5 rounded-xl px-2.5 py-2": size === "lg",
            "bg-secondary-300 group-hover:bg-secondary":
              variant === "secondary",
          },
          { "border-gray-400 bg-gray-400 group-hover:bg-gray-400": disabled },
          className,
        )}
        onClick={handleClick}
        ref={ref}
        type={type}
        {...props}
      >
        <StartOption />
        <div
          className={cn(
            "relative z-[200] flex h-full items-center overflow-hidden whitespace-nowrap",
            "font-inter text-xs font-semibold capitalize tracking-tight text-void",
            "px-1 drop-shadow-sm group-hover:text-void/90",
            "dark:text-chalk/80 dark:group-hover:text-chalk",
            { "text-chalk/90 group-hover:text-chalk": inverted },
            { "dark:text-void dark:group-hover:text-void": inverted },
            {
              "text-void group-hover:text-chalk": variant === "secondary",
              "text-sm font-semibold": size === "lg",
              "text-sm font-medium": size === "md",
            },
          )}
        >
          {children}
        </div>
        <EndOption />
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className={cn(
                "absolute animate-ripp rounded-full",
                "border border-dotted border-adam dark:border-cyan-100",
                "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-chalk via-steel/20 to-chalk dark:from-danger/5 dark:via-warning/20",
                {
                  "border-steel from-cyan-300/30 via-warning-100/10 to-adam/50":
                    inverted,
                  "border-void dark:from-secondary/10 dark:via-success/10 dark:to-indigo-500/60":
                    inverted,
                },
              )}
              key={ripple.key}
              style={{
                width: `${ripple.size}px`,
                height: `${ripple.size}px`,
                top: `${ripple.y}px`,
                left: `${ripple.x}px`,
                backgroundColor: rippleColor,
                transform: `scale(0)`,
                opacity: 0.05,
              }}
            />
          ))}
        </span>
      </button>
    </Container>
  );
};

interface ContainerProps {
  children?: ReactNode;
  size?: ButtSize;
  inverted?: boolean;
  containerStyle?: ClassName;
  disabled?: boolean;
}
const Container = ({
  children,
  size,
  inverted,
  containerStyle,
  disabled = false,
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "group relative flex h-fit w-fit items-center justify-center overflow-hidden p-1",
        {
          "rounded-[11px]": size === "sm",
          "rounded-[14px]": size === "md",
          "rounded-[16px]": size === "lg",
        },
        containerStyle,
      )}
    >
      <Shadow disabled={disabled} inverted={inverted} size={size} />
      {children}
    </div>
  );
};

interface ShadowProps {
  disabled: boolean;
  inverted?: boolean;
  size?: ButtSize;
}
const Shadow = ({ size, inverted, disabled }: ShadowProps) => {
  return (
    <div
      className={cn(
        "absolute size-full overflow-hidden opacity-20",
        "scale-75 group-hover:scale-100",
        { "rounded-[11px]": size === "sm" },
        { "rounded-[14px]": size === "md" },
        { "rounded-[16px]": size === "lg" },
        "group-hover:bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] group-hover:from-slate-300/20 group-hover:via-slate-200/60 group-hover:to-slate-200/50",
        "dark:group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:group-hover:from-slate-200/40 dark:group-hover:via-slate-300/30 dark:group-hover:to-slate-500/5",
        "group-hover:opacity-100 group-hover:backdrop-blur-xl",
        "border-primary-100/80 group-hover:border-[0.25px]",
        "dark:border-void",
        "transition-all duration-200 transform-gpu",
        "group-hover:shadow-inner dark:shadow-void/50",
        {
          "size-full group-hover:border-primary-300 group-hover:from-slate-500/60 group-hover:via-slate-400/60 group-hover:to-slate-400/50 group-hover:scale-100":
            inverted,
          "dark:from-slate-300/80 dark:via-slate-400/80 dark:to-slate-300/40 dark:group-hover:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]":
            inverted,
        },
        {
          "group-hover:opacity-0": disabled,
        },
      )}
    />
  );
};
