"use client";
// import { Chart } from "./chart";
import { Screen } from "@/ui/screen";
import { HStackII } from "@/ui/hstack";
import { Image, Link, Slider, type SliderValue } from "@nextui-org/react";
import { withAuth } from "../ctx/auth";
import { SqcIcon } from "@/ui/icons";
import { useCallback, useEffect, useState } from "react";
import { DialogWindow } from "@/ui/window";
import { ButtSqx } from "@/ui/button/index";
import { FireIcon } from "@heroicons/react/24/solid";
import { CommandLineIcon, UserIcon } from "@heroicons/react/24/outline";

const SignComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <Screen>
      <Screen.PadLg />
      <SigninHeader />
      <Screen.Dark>
        <HStackII cols={1}>
          <DialogWindow
            k="j"
            shadow="sm"
            open={open}
            setOpen={setOpen}
            variant="goddess"
          >
            <div className="flex size-96 items-center justify-center space-x-4">
              <div className="flex h-[49px] items-center space-x-4 border stroke-[1.5px] px-4">
                <ButtSqx icon={FireIcon} size="md" />
                <ButtSqx icon={CommandLineIcon} size="lg" />
                <ButtSqx icon={FireIcon} size="sm" />
                <ButtSqx icon={UserIcon} size="md" />
              </div>
            </div>
          </DialogWindow>
        </HStackII>
      </Screen.Dark>
      <Screen.PadSm />
    </Screen>
  );
};
// const AuthForm = () => (
//   <HStackII.ColII lg>
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="h-full w-full">
//         <EmailSigninForm />
//       </div>
//     </div>
//   </HStackII.ColII>
// );

// const Presentation = () => (
//   <HStack.Col lg>
//     <div className="h-full w-full bg-background">
//       <HStack.Title>
//         <div className="text-center">Remote Monitoring</div>
//       </HStack.Title>

//       <div className="m-20">{/* <Chart /> */}</div>
//     </div>
//   </HStack.Col>
// );

export const Playground = () => {
  const path = "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9";
  const [w, setw] = useState<number>(50);
  const [h, seth] = useState<number>(25);
  const [p, setp] = useState<string>(path);
  const [c, setc] = useState<number>(w / 3);

  const getw = useCallback((v: SliderValue) => {
    setw(+v);
  }, []);
  const geth = useCallback((v: SliderValue) => {
    seth(+v);
  }, []);

  useEffect(() => {
    setc(w / 3);
  }, [w]);

  // const path = "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9";
  useEffect(() => {
    setp(
      `M12 3c${c} 0 9 ${c / 4} 9 9s-${c / 4} 9-9 9-9-${c / 4}-9-9 ${c / 4}-9 9-9`,
    );
  }, [c]);
  return (
    <HStackII.ColII lg>
      <div className="flex h-full w-full items-center justify-center">
        <div className="block h-fit w-fit">
          <div className="flex h-[30rem] w-[54rem] bg-fade/50">
            <div className="flex h-full w-full items-center justify-center">
              <SqcIcon
                style={{ width: w, height: h }}
                className="border fill-steel text-steel"
              />
              <Sqci p={p} w={w} h={h} />
            </div>
            <div className="h-full w-2/6 p-6">
              <div className="space-y-4 font-jet text-icon">
                <div className="">H: {h}</div>
                <div className="">W: {w}</div>
                <div className="">
                  C: {((c / w) * w + c / (c * w)).toFixed(2)}
                </div>
                <div className="">CP: {(c / 4).toFixed(2)}</div>
                <div className="">CP: {(20 / (c / 4)).toFixed(2)}</div>
              </div>
            </div>
            <div className="h-full w-12 bg-fade-dark/10 p-4">
              <Slider
                size="lg"
                step={0.1}
                onChange={geth}
                defaultValue={h}
                color="secondary"
                orientation="vertical"
              />
            </div>
          </div>

          <div className="flex h-fit w-[54rem] items-center overflow-hidden whitespace-nowrap bg-fade px-4 font-jet text-xs text-icon">
            {p}
          </div>
          <div className="flex h-12 w-full items-center bg-fade-dark/10 p-4">
            <Slider
              size="lg"
              step={0.1}
              defaultValue={w}
              onChange={getw}
              color="secondary"
            />
          </div>
        </div>
      </div>
    </HStackII.ColII>
  );
};

const Sqci = (props: { p: string; w: number; h: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.w}
    height={props.h}
    viewBox={`0 0 25 50`}
    fill={"tomato"}
    className="border"
    // {...props}
  >
    <path
      d={props.p}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="tomato"
    />
  </svg>
);

const SigninHeader = () => (
  <div className="absolute left-0 top-0 z-[70] flex h-[calc(100vh*0.15)] w-full items-center space-x-4 pl-8">
    <div className="flex size-[24px] items-center justify-center rounded-full border-[0.33px] border-[#1B1F22]/50 bg-chalk xl:size-[32px]">
      <Link href="/">
        <Image
          alt=""
          src="/svg/logo_dark.svg"
          className="size-[12px] rounded-none xl:size-[16px]"
        />
      </Link>
    </div>
    <Link href="/">
      <h1 className="font-inst font-medium text-primary drop-shadow-lg xl:text-lg">
        FastInsure Technologies
      </h1>
    </Link>
  </div>
);

export const SignContent = withAuth(SignComponent);
