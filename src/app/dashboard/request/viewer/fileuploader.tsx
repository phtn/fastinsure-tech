import { opts } from "@/utils/helpers";
import { useFile } from "@request/hooks/useFile";
import { useCallback } from "react";
import { HiddenCanvas, ImageViewer } from "../create/forms/components";
import { cn } from "@/lib/utils";
import { FlexRow } from "@/ui/flex";
import { FastFile } from "@/ui/input";

export const UploadFiles = () => {
  const { inputRef, handleFileChange, imageData, clearFile } = useFile("extra");

  const ViewOptions = useCallback(() => {
    const withImage = typeof imageData !== "undefined";
    const options = opts(
      <ImageViewer
        imageData={imageData}
        clearFile={clearFile}
        className="h-full overflow-hidden"
      >
        <section className="absolute bottom-0 z-50 my-0.5 h-20 w-full overflow-y-hidden rounded-b-lg p-1">
          <div
            className={cn(
              "relative -bottom-20 w-full rounded-b-lg bg-void/10 backdrop-blur-xl transition-all duration-300 transform-gpu group-hover:bottom-1",
            )}
          >
            <FlexRow className="h-20 items-center rounded-b-lg">
              Image details
            </FlexRow>
          </div>
        </section>
      </ImageViewer>,
      <FastFile
        ref={inputRef}
        onChange={handleFileChange}
        className={cn("size-full bg-chalk")}
      />,
    );
    return <>{options.get(withImage)}</>;
  }, [clearFile, imageData, handleFileChange, inputRef]);

  return (
    <section className="px-6 py-12">
      <FlexRow className="_border h-96 w-full items-center rounded-3xl border-primary bg-primary-100/40 p-6">
        <ViewOptions />
        <div className="size-full">yo</div>
        <div className="size-full">
          <HiddenCanvas visible canvas_id="extra" />
        </div>
      </FlexRow>
    </section>
  );
};
