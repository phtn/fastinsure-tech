"use client";
import { Orbiter } from "./comp/orbiter";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useCallback } from "react";

export default function NotFound() {
  const router = useRouter();
  const handleBackRoute = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="flex h-[calc(100vh-200px)] w-[calc(100vw)] items-center justify-center">
      <div className="flex items-center space-x-20 border border-primary-300 p-6 text-default-600 shadow-md">
        <Orbiter />
        <div className="flex w-full flex-col items-end justify-center space-y-6 py-2 tracking-tight">
          <p className="text-xl font-bold">You have done well, bright one!</p>
          <div className="w-full px-2 text-justify text-sm opacity-80">
            If you want to exit the simulation,
            <br></br>
            this
            <Button
              size="sm"
              variant="ghost"
              color="primary"
              onPress={handleBackRoute}
              className="font-ibm mx-2 border-0 font-semibold uppercase text-primary"
            >
              link
            </Button>{" "}
            might help you.
          </div>
          <p className="p-2 text-end font-jet text-xs text-primary">
            {" "}
            404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}
