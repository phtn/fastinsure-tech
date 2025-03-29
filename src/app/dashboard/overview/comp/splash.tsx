import { Header } from "@/app/dashboard/components/header";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { TextLoader } from "@/ui/loader";
import { useState, type ReactNode } from "react";

interface SplashProps {
  children?: ReactNode;
  text?: string;
  role?: string;
  sm?: boolean;
}
export const Splash = (props: SplashProps) => {

  const [loading, setLoading] = useState(false)

  const handleUserRoute = () => {
    setLoading(true)
  }


  const handleSignOutRoute = () => {
    setLoading(false)
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl h-44 md:h-80",
        "bg-gray-200 border border-macl-gray/40 drop-shadow-sm",
        {"md:h-56": props.sm},
      )}
    >
      <div className="border border-chalk h-full rounded-[15px]">
        <div className="flex h-3/6">
        <Header role={props.role} title={props.text ?? "Overview"} />
        <RoleBadge role={props.role} />
        </div>
        <div className="h-1/6 w-full border-macd-gray flex justify-start px-3 items-center">
          {loading && <TextLoader container="animate-enter" size={12} />}
        </div>
        <div className="flex border-t border-x-[0.33px] px-4 md:px-8 border-macd-gray/20 space-x-8 rounded-t-sm rounded-b-[15px] bg-macd-gray/30 w-full items-center h-2/6">
          <ButtSqx icon="user-circle-fill" iconStyle="text-primary/80" onClick={handleUserRoute} />
          <ButtSqx icon="info-circle-fill" onClick={handleSignOutRoute} />
        </div>
      </div>
    </div>
  );
};

interface RoleBadgeProps {
  role?: string;
}

const RoleBadge = ({ role }: RoleBadgeProps) => {
  return (
    <div className="h-16 flex items-center">
      <div className="rounded-xl bg-gradient-to-tl from-slate-600 via-zinc-500/60 to-macl-gray border-[0.33px] border-white shadow-md">
        {role === "admin" && <Icon name="crown-light" className="text-white drop-shadow-sm" />}
      </div>
      <div className={cn("rounded-s-xl py-1 relative -right-[2.5px] shadow-md border-chalk border-e-0 border-[0.75px] px-3 h-fit",
        "text-tiny font-bold text-white uppercase bg-gradient-to-l",
        {"from-blue-700 via-macl-blue to-macd-blue": role === "admin",
          "from-green-600 via-macl-green/80 to-macd-green/80": !role,
          "text-orange-400 from-slate-200 via-slate-100/80 to-slate-100/40": role === "neo"
        }
      )}>{role === "neo" ? "new" : "New"}</div>
    </div>
  );
};
