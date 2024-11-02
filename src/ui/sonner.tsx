"use client";

import { useThemeCtx } from "@/app/ctx/theme";
import { type ClassName } from "@/app/types";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Snackbar = ({ ...props }: ToasterProps) => {
  const { theme } = useThemeCtx();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

interface SnackbarProps {
  title: string;
  description?: string;
  className?: ClassName;
}
export const infoSnack = ({ title, description, className }: SnackbarProps) =>
  toast.message(title, {
    description,
    descriptionClassName: className,
    position: "top-right",
  });
