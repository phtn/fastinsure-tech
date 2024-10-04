import { type PropsWithChildren } from "react";
import { AuthSupport, Form } from "./form";

const Outer = ({ children }: PropsWithChildren) => (
  <div className="mx-5 rounded-[8.33px] sm:mx-0">{children}</div>
);
const Inner = ({ children }: PropsWithChildren) => (
  <div className="shadow-i-tl-li-hv rounded-[8.33px] border-[0.33px] border-primary-500 bg-background/95 p-1 backdrop-blur-sm">
    <div className="shadow-i-br-li flex w-full flex-col justify-center space-y-4 rounded-[6px] border-[0.33px] border-primary-300/40 bg-background px-2 py-8 sm:px-4 md:py-4 lg:w-[calc(100vw/3)] xl:w-[calc(100vw/3.75)] xl:py-12">
      {children}
    </div>
  </div>
);
export const AuthLobby = () => {
  return (
    <Outer>
      <Inner>
        <Form />
        <AuthSupport />
      </Inner>
    </Outer>
  );
};
