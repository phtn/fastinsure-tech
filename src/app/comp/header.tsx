import { cn } from "@/lib/utils";

export const Header = (props: { title?: string; subtext?: string }) => (
  <div
    className={cn(
      "flex h-[calc(100vh*0.225)] w-full items-center justify-center p-4 font-inst text-background md:h-[calc(100vh*0.35)] lg:grid-cols-2 xl:h-[calc(100vh*0.175)] xl:p-12",
    )}
  >
    <div className="flex h-full w-full flex-col items-start justify-center px-6 xl:px-12">
      <h2 className="text-3xl font-semibold tracking-tight md:text-2xl xl:text-4xl">
        {props.title}
      </h2>
      <p className="text-sm opacity-60">{props.subtext}</p>
    </div>
  </div>
);
