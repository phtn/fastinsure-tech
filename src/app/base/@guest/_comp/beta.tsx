import { AuthLobby } from "../_auth/signin";
import { Chart } from "./chart";

export const Beta = () => (
  <div className="h-fit w-screen overflow-y-auto overflow-x-clip border border-t-[0.33px] pb-20 xl:h-screen xl:pb-0">
    <div className="h-2 bg-default" />
    <Header />
    <Columns />
  </div>
);

const Header = () => (
  <div className="font-inst flex h-[calc(100vh*0.225)] w-full items-center justify-center p-4 md:h-[calc(100vh*0.35)] lg:grid-cols-2 xl:h-[calc(100vh*0.25)] xl:p-12">
    <div className="flex h-full w-full flex-col items-start justify-center px-6 xl:px-12">
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
      <AuthLobby />
    </div>
    <div className="h-full w-full px-6 lg:col-span-3 xl:pr-20 portrait:hidden">
      <div className="font-inst py-2 text-2xl font-medium opacity-60 xl:py-6">
        Remote Monitoring
      </div>
      <Chart />
    </div>
  </div>
);
