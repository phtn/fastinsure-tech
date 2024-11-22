"use client";

import { Link, Tab, Tabs } from "@nextui-org/react";
import { EmailSigninForm } from "./email";
import { WithPhoneForm } from "./phone";
import { memo } from "react";

const SigninForm = () => {
  return (
    <Tabs
      size="md"
      radius="sm"
      className="w-full portrait:px-4"
      variant="underlined"
      color="secondary"
      classNames={{
        tabList: " w-fit",
        tab: "px-2 active:text-background",
      }}
    >
      <Tab key="email" title="Email">
        <EmailSigninForm />
      </Tab>
      <Tab key="phone" title="Phone">
        <WithPhoneForm />
      </Tab>
    </Tabs>
  );
};

const AuthSupport = () => (
  <div className="flex w-full items-center justify-center space-x-4 pb-6 text-xs tracking-tight opacity-70">
    <Link
      size="sm"
      className="cursor-pointer font-normal decoration-background/40 underline-offset-4 hover:underline"
    >
      <p>Sign up</p>
    </Link>
    <p className="text-center font-light">|</p>
    <Link
      size="sm"
      className="cursor-pointer font-normal decoration-background/40 underline-offset-4 hover:underline"
    >
      <p>Account Recovery</p>
    </Link>
  </div>
);

export const Support = memo(AuthSupport);
export const SignForm = memo(SigninForm);
