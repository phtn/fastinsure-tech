import { cn } from "@/lib/utils";
import SkylineII from "@/app/sandbox/skylineII";
import { ButtSqx } from "@/ui/button/button";
import { PencilIcon } from "@heroicons/react/24/solid";
import { SquircleIcon } from "lucide-react";
import { Image } from "@nextui-org/react";
import { ButtSex } from "@/ui/button/ripple";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { use, useCallback } from "react";
import { AccountCtx } from "./ctx";
import { PfpEditor } from "./side-pfp";
import { opts } from "@/utils/helpers";
import { LoaderSm } from "@/ui/loader";
import { useRouter } from "next/navigation";

export const Pfp = () => {
  const { vxuser } = useAuthCtx();
  const { fileChange, inputFileRef, browseFile, pfp } = use(AccountCtx)!;
  const router = useRouter();
  const handleSignout = useCallback(() => {
    router.push("/dashboard/prime");
  }, [router]);

  const AvatarOptions = useCallback(() => {
    const options = opts(
      <Image
        alt="user-pfp"
        src={pfp ?? vxuser?.photo_url}
        width={124}
        height={124}
        isLoading={!pfp}
      />,
      <LoaderSm />,
    );
    return <>{options.get(!!pfp)}</>;
  }, [pfp, vxuser?.photo_url]);
  return (
    <section id="top-section" className="relative h-72 w-full">
      <div
        id="cover-photo"
        className={cn(
          "h-56 w-full",
          "overflow-hidden rounded-tl-xl bg-steel",
          "_to-slate-600/50 bg-gradient-to-t from-stone-100/30 via-slate-400/40 to-void",
          "_gray-200/20 via_-gray-200/50 dark:from-void dark:via-secondary-700/40 dark:to-secondary-700",
        )}
      >
        <SkylineII />
      </div>
      <div
        id="cover-bottom-padding"
        className="flex h-16 w-full items-center justify-end bg-background px-4"
      >
        <div className="flex h-10 w-fit items-center justify-end space-x-4">

          <ButtSex size="md" inverted onClick={handleSignout}>
            <p className="font-inst text-orange-100 text-xs font-medium tracking-tighter">
              Sign out
            </p>
          </ButtSex>
        </div>
      </div>
      <div
        id="user-pfp"
        className="absolute bottom-0 mx-10 size-32 rounded-full bg-background p-1"
      >
        <div className="flex size-full items-center justify-center overflow-clip rounded-full bg-primary-400">
          <AvatarOptions />
        </div>

        <SquircleIcon className="_bg-foreground/60 bg-void_ justify-center- absolute bottom-2 right-3 z-[50] flex size-[28px] items-center fill-secondary-200 stroke-secondary-200 drop-shadow-sm -rotate-[15deg] dark:fill-secondary-700 dark:stroke-secondary-700" />
        <input
          type="file"
          ref={inputFileRef}
          className="pointer-events-none size-1 opacity-0"
          onChange={fileChange}
        />
        <ButtSqx
          size="sm"
          inverted
          icon={PencilIcon}
          onClick={browseFile}
          className="absolute bottom-[6px] right-[9.7px] z-50 -rotate-[15deg]"
        />
      </div>
      <PfpEditor title="Edit Photo" />
    </section>
  );
};
