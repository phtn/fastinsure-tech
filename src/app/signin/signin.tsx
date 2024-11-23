import { Chart } from "./chart";
import { Screen } from "@/ui/screen";
import { HStack, HStackII } from "@/ui/hstack";
import { EmailSigninForm } from "./email";
import { withAuth } from "../ctx/auth";
import { Image, Link } from "@nextui-org/react";

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

export const SigninHeader = () => (
  <div className="absolute left-0 top-0 z-[70] flex h-[calc(100vh*0.15)] w-full items-center space-x-4 pl-8">
    <div className="flex size-[24px] items-center justify-center rounded-full border-[0.33px] border-[#1B1F22]/50 bg-chalk xl:size-[32px]">
      <Link className="/">
        <Image
          alt=""
          src="/svg/logo_dark.svg"
          className="size-[12px] rounded-none xl:size-[16px]"
        />
      </Link>
    </div>
    <Link className="/">
      <h1 className="font-inst font-medium text-primary drop-shadow-lg xl:text-lg">
        FastInsure Technologies
      </h1>
    </Link>
  </div>
);

export const AuthComponent = withAuth(SigninScreen);
