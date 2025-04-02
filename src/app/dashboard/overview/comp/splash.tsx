import { Header } from "@/app/dashboard/components/header";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { TextLoader } from "@/ui/loader";
import { useRouter } from "next/navigation";
import { useCallback, useState, type ReactNode } from "react";

interface SplashProps {
  children?: ReactNode;
  text?: string;
  role?: string;
  sm?: boolean;
}
export const Splash = (props: SplashProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUserRoute = () => {
    setLoading(true)
    router.push("/dashboard/account")
  }

  const handleGroupRoute = useCallback(() => {
    router.push("/dashboard/team")
  }, [router])


  const handleRequestRoute = useCallback(() => {
    router.push("/dashboard/requests")
  }, [router])
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl h-44 md:h-80",
        "bg-gray-200 border border-macl-gray md:border-macl-gray/40 drop-shadow-sm",
        {"md:h-56": props.sm},
      )}
    >
      <div className="border border-chalk h-full rounded-[15px]">
        <div className="flex h-3/6">
        <Header role={props.role} title={props.text ?? "Overview"} />
        <RoleBadge role={props.role} />
        </div>
        <div className="h-1/6 md:hidden w-full flex justify-start px-3 items-center">
          {loading && <TextLoader color="text-primary" container="animate-enter" size={12} />}
        </div>
        <div className="flex md:hidden border-t border-x-[0.33px] px-4 md:px-8 border-macd-gray/20 space-x-8 rounded-t-sm rounded-b-[15px] bg-primary w-full items-center h-2/6">

          <ButtSqx icon="user-circle" iconStyle="text-chalk" onClick={handleUserRoute} />
          <ButtSqx icon="groups" iconStyle="text-chalk" onClick={handleGroupRoute} />
          <ButtSqx icon="folder-linear" iconStyle="text-chalk" onClick={handleRequestRoute} />
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
      <div className="rounded-xl bg-primary border-[0.33px] border-white shadow-md">
        {role === "admin" && <Icon name="crown-light" className="text-yellow-500 drop-shadow-sm" />}
      </div>
      <div className={cn("rounded-s-xl py-1 relative -right-[2.5px] shadow-lg border-chalk border-e-0 border-[0.75px] px-3 h-fit",
        "text-sm font-bold text-white uppercase bg-gradient-to-l",
        {
          "from-green-600 via-macl-green/80 to-slate-500/40": !role,
          "from-primary via-primary to-primary": role === "admin",
          "from-sky-400 via-sky-500/60 to-sky-500/80": role === "manager",
          "from-slate-400 via-slate-500/60 to-slate-500/80": role === "agent",
          "from-indigo-400 via-indigo-500/60 to-indigo-500/80": role === "underwriter",
          "text-orange-400 from-slate-200 via-slate-100/80 to-slate-100/40": role === "neo"
        }
      )}>{role === "neo" ? "new" : role}</div>
    </div>
  );
};
