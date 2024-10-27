import { AuthSupport, SigninForm } from "./form";

export const SignInModule = () => {
  return (
    <div className="mx-5 rounded-[8.33px] sm:mx-0">
      <div className="rounded-[8.33px] border-[0.33px] border-primary-500 bg-background/95 p-1 shadow-i-tl-li-hv backdrop-blur-sm">
        <div className="flex w-full flex-col justify-center space-y-4 rounded-[6px] border-[0.33px] border-primary-300/40 bg-background px-2 py-8 shadow-i-br-li sm:px-4 md:py-4 lg:w-[calc(100vw/3)] xl:w-[calc(100vw/3.75)] xl:py-12">
          <SigninForm />
          <AuthSupport />
        </div>
      </div>
    </div>
  );
};
