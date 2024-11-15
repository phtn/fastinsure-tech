import { Support, SignForm } from "./tabs";
import { Chart } from "./chart";
import { Screen } from "@/ui/screen";
import { HStack } from "@/ui/hstack";
import { memo } from "react";

const SigninScreen = () => (
  <Screen>
    <Screen.PadSm />
    <Screen.Default>
      {/* <Screen.Header>
        <Screen.Title dark>Partner Login</Screen.Title>
      </Screen.Header> */}

      <HStack cols={6}>
        <AuthForm />
        <Presentation />
      </HStack>
    </Screen.Default>
    <Screen.PadLg />
  </Screen>
);

export const AuthForm = () => (
  <HStack.Col lg>
    <div className="mx-5 flex h-full w-full items-center justify-center rounded-[8.33px] sm:mx-0">
      <div className="_border-[0.33px] _bg-background/10 backdrop-blur-lg_ _shadow-i-tl-li-hv rounded-[8.33px] border-slate-400 p-1">
        <div className="_border-[0.33px] _bg-foreground/70 shadow-i-br-li_ flex w-full flex-col justify-center space-y-4 rounded-[6px] border-slate-300/40 px-2 py-8 sm:px-4 md:py-4 lg:w-[calc(100vw/3)] xl:w-[calc(100vw/3.75)] xl:py-12">
          <SignForm />
          <Support />
        </div>
      </div>
    </div>
  </HStack.Col>
);

const Presentation = () => (
  <HStack.Col lg>
    <div className="h-full w-full bg-background">
      <HStack.Title>
        <div className="text-center">Remote Monitoring</div>
      </HStack.Title>

      <div className="m-20">
        <Chart />
      </div>
    </div>
  </HStack.Col>
);

export const AuthComponent = memo(SigninScreen);
