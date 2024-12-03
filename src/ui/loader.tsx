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
export function LoaderSm() {
  return (
    <div className="flex size-48 items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Atomic />
      </div>
    </div>
  );
}
export function LoaderMd() {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Atomic />
      </div>
    </div>
  );
}
