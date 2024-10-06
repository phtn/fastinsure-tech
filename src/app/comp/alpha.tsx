"use client";

import { Spacing } from "@/ui/spacing";
import { guid } from "@/utils/helpers";
import { Button, Image } from "@nextui-org/react";
import { memo, useCallback, Suspense } from "react"; // Import lazy and Suspense
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Flow } from "./flow";

// Dynamically import the Flow component

const Header = () => (
  <div className="flex h-[calc(100vh*0.15)] w-full items-center space-x-4 pl-6 md:pl-14 xl:h-[calc(100vh*0.15)] xl:pl-20">
    <div className="flex size-[24px] items-center justify-center rounded-full border-1 border-primary/40 xl:size-[32px]">
      <Image
        alt=""
        src="/svg/logo_dark.svg"
        className="size-[12px] rounded-none xl:size-[16px]"
      />
    </div>
    <h1 className="font-jet font-medium tracking-tight text-foreground drop-shadow-lg xl:text-lg">
      FastInsure Technologies
    </h1>
  </div>
);

const MemoizedChevronIcon = memo(() => (
  <div className="-mr-3.5 flex size-8 items-center justify-center rounded-full bg-background">
    <ChevronRightIcon className="size-3 text-foreground" />
  </div>
));
MemoizedChevronIcon.displayName = "MemoizedChevronIcon";

const MemoizedButton = memo((props: { onPress: VoidFunction }) => {
  const handlePress = useCallback(() => {
    props.onPress();
  }, [props]);

  return (
    <Button
      size="lg"
      radius="full"
      variant="shadow"
      color="primary"
      className=""
      onPress={handlePress}
    >
      <div className="pr-4">Get Started</div>
      <MemoizedChevronIcon />
    </Button>
  );
});
MemoizedButton.displayName = "MemoizedButton";

const Jumbotron = memo(() => {
  const handlePress = useCallback(() => {
    console.log(guid());
  }, []);

  return (
    <div className="relative ml-6 h-full w-full content-center space-y-12 md:ml-14 xl:ml-20">
      <div>
        <Spacing text="TECH DRIVEN" />
        <Spacing bold text="Business" />
        <Spacing bold text="Engineering" />
      </div>
      <div>
        <MemoizedButton onPress={handlePress} />
      </div>
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

export const Alpha = memo(() => (
  <div className="h-fit md:h-full">
    <Header />
    <Hero />
  </div>
));
Alpha.displayName = "Alpha";
