import { useAuthCtx } from "@/app/ctx/auth/auth";
import { opts } from "@/utils/helpers";
import { cn, Button, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";
import { FlexRow } from "../flex";
import Link from "next/link";

const UserSectionComponent = (props: { open: boolean }) => {
  const { vxuser } = useAuthCtx();
  const router = useRouter();
  const signOut = useCallback(() => {
    router.push("/dashboard/prime");
  }, [router]);

  const LegalOptions = useCallback(() => {
    const options = opts(
      <section className="whitespace-nowrap">
        <FlexRow className="h-4 items-center font-inst text-[11px] font-medium text-steel/80 drop-shadow-md">
          FastInsure Technologies, Inc.{" "}
          <span className="px-[2px] font-inter">&copy;</span>{" "}
          {/* {new Date().getFullYear()} */}
        </FlexRow>
        <FlexRow className="h-4 items-center px-[1px] font-inst text-[10px] text-steel/70 drop-shadow-md">
          <span>Privacy</span>
          <span>⏺</span>
          <span>Terms</span>
          <span>⏺</span>
          <span>Cookies</span>
        </FlexRow>
      </section>,
      <motion.div
        initial={{ height: 32, width: 32 }}
        animate={{
          height: props.open ? 32 : 4,
        }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="flex justify-center rounded-full"
      >
        <motion.div
          initial={{ height: 6, width: 6, backgroundColor: "transparent" }}
          animate={{
            height: props.open ? 8 : 6,
            width: props.open ? 6 : 32,
            backgroundColor: props.open ? "transparent" : "#9ca3af ",
          }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="rounded-full"
        ></motion.div>
      </motion.div>,
    );

    return <>{options.get(props.open)}</>;
  }, [props.open]);
  return (
    <section>
      <div className="relative -left-4 mb-2 flex size-16 items-center whitespace-nowrap transition-transform duration-300">
        <Link
          href="/dashboard/account"
          className="absolute flex size-16 items-center justify-center"
        >
          <Image
            alt="admin-logo"
            src={vxuser?.photo_url ?? "/svg/user.svg"}
            className="z-[100] animate-enter border border-chalk/50"
            width={28}
            height={28}
          />
        </Link>

        <div className="flex items-center space-x-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "ml-14 flex flex-shrink whitespace-nowrap px-4 font-jet text-sm tracking-widest text-steel dark:text-primary-600",
            )}
          >
            {vxuser?.nickname ?? vxuser?.email}
          </motion.span>
          <Button
            size="sm"
            variant="flat"
            onPress={signOut}
            className={cn(
              "hidden w-14 border-0 bg-chalk/20 px-2 font-inst font-light tracking-tighter text-chalk/80",
              {
                flex: props.open,
              },
            )}
          >
            <span className="px-4">Sign out</span>
          </Button>
        </div>
      </div>
      <LegalOptions />
    </section>
  );
};

export const UserSection = memo(UserSectionComponent);
