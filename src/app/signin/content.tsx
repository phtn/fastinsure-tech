"use client";

import { Dev } from "./dev";
import { AuthContent } from "./auth-scr";

export const SigninContent = () => {
  return (
    <div className="h-fit w-full space-y-12">
      <Dev />
      <AuthContent />
    </div>
  );
};
