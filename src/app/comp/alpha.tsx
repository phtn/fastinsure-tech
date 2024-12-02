"use client";

import { Spacing } from "@/ui/spacing";
import { Button, Image } from "@nextui-org/react";
import { memo, Suspense, useCallback, useState } from "react"; // Import lazy and Suspense
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Flow } from "./flow";
import { AuthCommand } from "../auth/sign";
import { withAuth } from "../ctx/auth";

const Header = () => (
  <div className="flex h-[calc(100vh*0.15)] w-full items-center space-x-4 pl-6 md:pl-14 xl:h-[calc(100vh*0.15)] xl:pl-20">
    <div className="flex size-[24px] items-center justify-center rounded-full border-1 border-primary/40 bg-void xl:size-[32px]">
      <Image
        alt="logo"
        src={"/svg/f.svg"}
        className="size-[12px] rounded-none xl:size-[16px]"
      />
    </div>
    <h1 className="font-inst font-medium text-foreground drop-shadow-lg dark:text-foreground/60 xl:text-lg">
      FastInsure Technologies
    </h1>
  </div>
);

const HeroButton = () => {
  const handleButtonClick = useCallback(() => {
    const event = new KeyboardEvent("keydown", {
      key: "j",
      bubbles: true,
      cancelable: true,
      metaKey: true,
      ctrlKey: true,
    });
    document.dispatchEvent(event);
  }, []);
  return (
    <div>
      <Button
        size="lg"
        radius="full"
        variant="shadow"
        color="primary"
        onPress={handleButtonClick}
      >
        <div className="pr-4">{"Get Started"}</div>
        <div className="-mr-3.5 flex size-8 items-center justify-center rounded-full bg-background">
          <ChevronRightIcon className="size-3 text-foreground" />
        </div>
      </Button>
      <Authentication />
    </div>
  );
};

const Jumbotron = memo(() => {
  return (
    <div className="relative ml-6 h-full w-full content-center space-y-12 md:ml-14 xl:ml-20">
      <div>
        <Spacing text="TECH DRIVEN" />
        <Spacing bold text="Business" />
        <Spacing bold text="Engineering" />
      </div>
      <HeroButton />
    </div>
  );
});
Jumbotron.displayName = "Jumbotron";

const Hero = memo(() => (
  <div className="grid h-[calc(100vh*0.5)] grid-cols-1 content-center md:h-[calc(100vh*0.7)] lg:grid-cols-2 xl:h-[calc(100vh*0.7)]">
    <Jumbotron />
    <Suspense fallback={<div>Loading...</div>}>
      <Flow />
    </Suspense>
  </div>
));
Hero.displayName = "Hero";

export const Alpha = memo(() => {
  return (
    <div className="h-fit md:h-screen">
      <Header />
      <Hero />
    </div>
  );
});
Alpha.displayName = "Alpha";

const AuthCard = () => {
  const [open, setOpen] = useState(false);
  return <AuthCommand open={open} setOpen={setOpen} />;
};

const Authentication = withAuth(AuthCard);
