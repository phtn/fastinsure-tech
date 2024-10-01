import { type PropsWithChildren } from "react";
import { Form } from "./form";
import { Divider } from "@nextui-org/react";

export const Lobby = () => {
  return (
    <Wrapper>
      <div className="h-24 space-y-2 px-6">
        <Heading />
        <Divider
          orientation="horizontal"
          className="h-[1px] bg-gradient-to-r from-primary to-transparent"
        />
      </div>
      <Form />
    </Wrapper>
  );
};

const Heading = () => (
  <div className="space-y-0.5 text-left text-gray-800">
    <h2 className="text-2xl font-semibold tracking-tighter md:text-2xl">
      Partner Login
    </h2>
    <p className="text-sm">Sign in to your account to get started</p>
  </div>
);

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-10">
    <div className="w-full md:w-fit">
      <div className="rounded-md bg-white/10 backdrop-blur-md md:p-6">
        <div className="h-fit rounded-sm bg-gradient-to-br from-sky-900/20 to-transparent py-12 drop-shadow-2xl md:px-6">
          {children}
        </div>
      </div>
    </div>
  </div>
);
