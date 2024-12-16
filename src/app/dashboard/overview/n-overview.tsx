"use client";

import { HStack } from "@/ui/hstack";
import { Widget } from "@/ui/widget";
import { Splash } from "./comp/splash";
import { motion } from "framer-motion";
import { HyperText } from "@/ui/hypertext";
import { BigActionCard } from "@/ui/action-card";
import { FireIcon } from "@heroicons/react/24/solid";
import { Button, Input } from "@nextui-org/react";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useActionState, useCallback, useState } from "react";
import Json from "@/ui/json";
import { LoaderMd } from "@/ui/loader";

export const NeoOverview = () => {
  const { user, claims, signOut } = useAuthCtx();
  const [json, setJson] = useState<object | null>({});

  // const handleVerification = useCallback(async () => {
  //   await verifyUser({ uid: user?.uid });
  // }, [user?.uid]);

  // const getUsr = useCallback(() => {
  //   setJson({ payload: "test" });
  //   if (!user?.uid) {
  //     setJson({ uid: user?.uid });
  //     return;
  //   }
  //   const vx = usr.get.byId(user.uid);
  //   setJson(vx);
  // }, [user?.uid, usr.get]);

  // const getCustomClaims = useCallback(async () => {
  //   if (!user) {
  //     onWarn("User is null");
  //     return;
  //   }
  //   const claims = (await user?.getIdTokenResult()).claims;
  //   setJson(claims);
  // }, [user]);

  const getStoredClaims = useCallback(() => {
    setJson(claims);
  }, [claims]);

  const handleActivation = useCallback(
    async (prevState: { hcode: string } | undefined, f: FormData) => {
      if (!user?.uid) {
        await signOut();
      }

      const v = {
        hcode: f.get("hcode") as string,
      };

      if (!v) prevState = undefined;

      return v ? v : prevState;
    },
    [user?.uid, signOut],
  );
  const [state, action, pending] = useActionState(handleActivation, undefined);

  // const getServerHealth = useCallback(async () => {
  //   await ServerHealthCheck();
  // }, []);

  return (
    <div className="overflow-auto pb-6">
      <Splash text={state?.hcode}>
        <div className="absolute top-4 z-[60] flex h-1/2 w-1/3 items-center border-primary px-12 font-inst text-2xl delay-1000">
          {user ? `Hello, ${user?.displayName ?? user?.email}!` : null}
        </div>
        <div className="absolute bottom-0 z-[60] h-1/2 w-full px-12">
          <motion.section
            initial={{ height: "0%" }}
            animate={{ height: "66%" }}
            transition={{ duration: 2, delay: 3 }}
            className="flex h-2/3 w-full items-start justify-start border-l-[0.33px] border-primary/40"
          >
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 4, opacity: 1 }}
              transition={{ duration: 0.5, delay: 3 }}
              className="h-5 border-y-[0.33px] border-e-[0.33px] border-primary/60 bg-warning"
            >
              <div className="flex h-5 items-center px-3.5 font-jet text-xs font-light tracking-wider">
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 5 }}
                  className="uppercase"
                >
                  Status
                </motion.p>
                <motion.div
                  initial={{ visibility: "hidden" }}
                  animate={{ visibility: "inherit" }}
                  transition={{ delay: 5.5 }}
                  className="w-fit font-bold"
                >
                  <HyperText duration={1500} text="inactive" />
                </motion.div>
              </div>
              <div className="flex w-[calc(50vw)] items-center justify-between space-x-4 px-4 pt-5">
                <form action={action}>
                  <div className="flex h-12 w-fit items-center space-x-1.5 whitespace-nowrap">
                    <Input
                      size="sm"
                      radius="sm"
                      name="hcode"
                      placeholder="code"
                      className="h-[2.175rem] w-32 rounded-md border border-primary-500 bg-primary-50 font-bold tracking-[0.25rem] text-foreground/80"
                      classNames={{
                        input: "text-center uppercase",
                      }}
                    />
                    <Button
                      variant="solid"
                      color="primary"
                      className="h-[2.175rem] w-32 px-2 font-inter font-medium"
                      isLoading={pending}
                      type="submit"
                    >
                      Activate now
                    </Button>
                    <Input
                      size="sm"
                      name="email"
                      className="hidden"
                      defaultValue={user?.email ?? ""}
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </Splash>
      {/* <div className="mx-2 h-4 backdrop-blur-xl" /> */}
      <Widget>
        <Widget.BaseII>
          <HStack cols={3} className="gap-4 px-4">
            <HStack.XsCol>
              {claims ? (
                <div className="h-full w-full space-y-[0px] text-foreground">
                  <Widget.Title>
                    <p className="decoration-slice p-4 font-bold tracking-wide underline decoration-primary-400 decoration-2 underline-offset-[6px]">
                      Start here
                    </p>
                  </Widget.Title>
                  {/* <GenericAction
                  loading={false}
                  label="Run test"
                  fn={handleVerification}
                  subtext="User verification testing"
                  title="Verification Test"
                  icon={WindowIcon}
                />
                <GenericAction
                  loading={false}
                  label="Get Info"
                  fn={getUsr}
                  subtext="Fetch Convex."
                  title="Get User Info"
                  icon={BookOpenIcon}
                />
                <GenericAction
                  loading={false}
                  label="Fetch"
                  fn={getCustomClaims}
                  subtext="Claims determines users access privileges."
                  title="Fetch Custom Claims"
                  icon={ShieldCheckIcon}
                /> */}
                </div>
              ) : (
                <LoaderMd />
              )}
            </HStack.XsCol>
            <HStack.SmCol>
              <BigActionCard>
                <BigActionCard.Icon icon={FireIcon} />
                <div>
                  <BigActionCard.Header>
                    <BigActionCard.Title>Updates</BigActionCard.Title>
                    <BigActionCard.Subtext>
                      Read blog posts from our team.
                    </BigActionCard.Subtext>
                  </BigActionCard.Header>
                  <div className="flex h-72 w-96 items-start justify-start pr-4 pt-4 font-inst text-xs">
                    <div className="size-full rounded-lg bg-chalk p-4 drop-shadow dark:bg-chalk/60">
                      <Button
                        variant="flat"
                        color="primary"
                        size="md"
                        onPress={getStoredClaims}
                      >
                        Get Stored Claims
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="h-full w-full flex-grow-0 overflow-scroll rounded-lg bg-void">
                  <Json src={{ ...json }} theme="ashes" />
                </div>
              </BigActionCard>
            </HStack.SmCol>
          </HStack>
        </Widget.BaseII>
        <Widget.PadLg />
      </Widget>
    </div>
  );
};
