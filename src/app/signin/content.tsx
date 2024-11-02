"use client";

import { AuthComponent } from "./login-module";
import { toast } from "sonner";
import { memo, useCallback, useEffect } from "react";
import { onSuccess } from "../ctx/toasts";

export const SigninContent = () => {
  const showSnackbar = useCallback(() => {
    toast.message("it, cant be that nigger", { position: "top-right" });
  }, []);
  useEffect(() => {
    onSuccess("What on earth");
    showSnackbar();
  }, [showSnackbar]);
  return <AuthComponent />;
};

export const SignContent = memo(SigninContent);
