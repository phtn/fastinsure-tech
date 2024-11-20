import { Chart } from "./chart";
import { Screen } from "@/ui/screen";
import { HStack, HStackII } from "@/ui/hstack";
import { memo } from "react";
import { EmailSigninForm, SigninHeader } from "./email";

const SigninScreen = () => (
  <Screen>
    <Screen.PadLg />
    <SigninHeader />
    <Screen.Dark>
      <HStackII cols={6}>
        <AuthForm />
        <Presentation />
      </HStackII>
    </Screen.Dark>
    <Screen.PadSm />
  </Screen>
);

export const AuthForm = () => (
  <HStackII.ColII lg>
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-full w-full">
        <EmailSigninForm />
      </div>
    </div>
  </HStackII.ColII>
);

const Presentation = () => (
  <HStack.Col lg>
    <div className="h-full w-full border bg-background">
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
