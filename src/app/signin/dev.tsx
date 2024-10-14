// import { useDev } from "@/lib/auth/useDev";
"use client";

import Json from "@/ui/json";
import { guid } from "@/utils/helpers";
import { Button } from "@nextui-org/react";
// import { useAuthCtx } from "../ctx/auth";
import { useDev } from "@/lib/auth/useDev";
import { useMemo } from "react";
import { useAuthCtx } from "../ctx/auth";
import { useSignIn } from "@/lib/auth/useSignIn";

export const Dev = () => {
  const { loading, error, testGet, testSet } = useDev();
  const { idToken } = useSignIn();

  const { signOut, user } = useAuthCtx();
  const handleSetArb = async () => {
    // await setAuthKey(guid());
    console.log(guid());
  };

  const stableValues = useMemo(
    () => (error ? { error } : { idToken }),
    [error, idToken],
  );

  return (
    <div className="h-[calc(100vh*0.8)] w-screen p-1 md:p-12">
      <div className="h-full w-full space-y-4 overflow-y-scroll rounded-[3rem] border border-primary/20 bg-background/80 p-10 font-inst md:p-20">
        <div className="flex items-center space-x-4">
          <strong>Dev&middot;test</strong>
          <Button
            size="sm"
            variant="solid"
            isLoading={loading}
            onPress={handleSetArb}
            color="secondary"
            disabled
          >
            fetch users
          </Button>

          <Button
            size="sm"
            variant="solid"
            isLoading={loading}
            onPress={testSet}
            color="secondary"
            disabled
          >
            test set
          </Button>
          <Button
            size="sm"
            variant="solid"
            isLoading={loading}
            onPress={testGet}
            color="secondary"
            disabled
          >
            test get
          </Button>

          {user ? (
            <Button
              size="sm"
              variant="solid"
              isLoading={loading}
              onPress={signOut}
              color="warning"
            >
              Sign out
            </Button>
          ) : null}
        </div>
        <Json src={stableValues ?? {}} />
      </div>
    </div>
  );
};
