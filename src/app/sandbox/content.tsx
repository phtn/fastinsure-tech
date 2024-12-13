"use client";

import { Screen } from "@/ui/screen";
import { Image, Link } from "@nextui-org/react";
import { useState } from "react";
import { DialogWindow } from "@/ui/window";
import { FlexRow } from "@/ui/flex";
import { ButtSex } from "@/ui/button/ripple";

export const Sandbox = () => {
  const [open, setOpen] = useState(false);

  return (
    <Screen>
      <Header />
      <FlexRow className="size-96 items-center justify-center">
        <ButtSex className="">Create account</ButtSex>
      </FlexRow>
      <DialogWindow
        k="j"
        shadow="sm"
        open={open}
        setOpen={setOpen}
        variant="goddess"
      >
        <div className="flex h-96 w-full items-center justify-center space-x-4">
          <p>YO:</p>
          <ButtSex rippleColor="#14141b">Let it rip!</ButtSex>
        </div>
      </DialogWindow>
      <Screen.PadLg />
    </Screen>
  );
};

const Header = () => (
  <FlexRow className="h-24 items-center">
    <Link
      href="/"
      className="flex size-[24px] items-center justify-center rounded-full border-[0.33px] border-[#1B1F22]/50 bg-chalk xl:size-[32px]"
    >
      <Image
        alt=""
        src="/svg/logo_dark.svg"
        className="size-[12px] rounded-none xl:size-[16px]"
      />
    </Link>
    <h1 className="font-inst font-medium text-primary drop-shadow-lg xl:text-lg">
      Sandbox
    </h1>
  </FlexRow>
);
