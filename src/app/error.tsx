"use client";

import { Button } from "@nextui-org/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="m-4 space-y-4 rounded-lg border border-rose-400 p-4">
      <h2 className="text-rose-500">
        <strong>(ERR)</strong> - Main
      </h2>
      <p className="font-mono text-xs text-gray-500">
        {error?.name} {error?.message}
      </p>
      <Button
        onClick={() => reset()}
        variant={"solid"}
        color="default"
        className="border-dyan/20 h-[36px] border-[0.33px] px-4"
      >
        Try again?
      </Button>
    </div>
  );
}
