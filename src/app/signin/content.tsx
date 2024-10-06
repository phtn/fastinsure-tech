"use client";

import { SignInModule } from "./signin";
import { Chart } from "./chart";

export const SignInContent = () => (
  <div className="flex h-full w-full flex-col items-center overflow-y-auto overflow-x-clip pb-20 md:px-8 xl:h-screen xl:pb-0">
    <div className="h-[calc(100vh*0.075)]" />
    <div className="h-full w-full rounded-[2.5rem] bg-foreground pb-10 xl:pb-0">
      <Header />
      <Columns />
    </div>
    <div className="h-[calc(100vh*0.1)]" />
  </div>
);

const Header = () => (
  <div className="flex h-[calc(100vh*0.225)] w-full items-center justify-center p-4 font-inst md:h-[calc(100vh*0.35)] lg:grid-cols-2 xl:h-[calc(100vh*0.175)] xl:p-12">
    <div className="flex h-full w-full flex-col items-start justify-center px-6 text-background xl:px-12">
      <h2 className="text-3xl font-semibold tracking-tight md:text-2xl xl:text-4xl">
        Partner Login
      </h2>
      <p className="text-sm opacity-60">
        Sign in to your account to get started
      </p>
    </div>
  </div>
);

const Columns = () => (
  <div className="_h-[calc(100vh*0.675-8px)] grid h-fit w-full grid-cols-1 lg:grid-cols-5 xl:h-[calc(100vh*0.75-8px)]">
    <div className="flex h-full w-full items-start justify-center lg:col-span-2">
      <SignInModule />
    </div>
    <div className="h-full w-full px-6 text-background/80 lg:col-span-3 xl:pr-20 portrait:hidden">
      <div className="py-2 font-inst text-2xl font-medium opacity-60 xl:py-6">
        Remote Monitoring
      </div>
      <Chart />
    </div>
  </div>
);
