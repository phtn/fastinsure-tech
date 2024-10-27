"use client";

import { Link, Tab, Tabs } from "@nextui-org/react";
import { EmailSigninForm } from "./email";
import { PhoneSigninForm } from "./phone";

export const SigninForm = () => {
  return (
    <Tabs
      size="md"
      radius="sm"
      className="w-full px-3 portrait:px-4"
      classNames={{
        tabList: "bg-primary-200",
        tab: "text-foreground text-sm",
      }}
    >
      <Tab key="email" title="Email">
        <EmailSigninForm />
      </Tab>
      <Tab key="phone" title="Phone">
        <PhoneSigninForm />
      </Tab>
    </Tabs>
  );
};

export const AuthSupport = () => (
  <div className="flex w-full items-center justify-center space-x-4 pb-6 text-xs font-thin">
    <Link size="sm" className="font-normal delay-700">
      Sign up
    </Link>
    <p className="text-center font-light">|</p>
    <Link size="sm" className="font-normal">
      Account Recovery
    </Link>
  </div>
);
