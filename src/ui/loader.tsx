import { Atomic } from "./atomic";

export function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Atomic />
      </div>
    </div>
  );
}
