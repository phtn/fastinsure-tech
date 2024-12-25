import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { LoaderMd } from "@/ui/loader";
import { SideVaul } from "@/ui/sidevaul";
import { FlatWindow } from "@/ui/window";
import { Image } from "@nextui-org/react";
import { UserCircle } from "lucide-react";
import { use, useCallback } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AccountCtx } from "./ctx";
import { ButtSqx } from "@/ui/button/button";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";
import { opts } from "@/utils/helpers";

interface UserPfpProps {
  title: string;
}
export const PfpEditor = ({ title }: UserPfpProps) => {
  const { open, toggleEditor, imageData, save, saving, canvasRef } =
    use(AccountCtx)!;

  const ViewOptions = useCallback(() => {
    const options = opts(<TransformView />, <LoaderMd />);
    return <>{options.get(typeof imageData === "string")}</>;
  }, [imageData]);

  return (
    <SideVaul open={open} onOpenChange={toggleEditor} direction="right">
      <FlatWindow
        icon={UserCircle}
        title={title}
        variant="god"
        closeFn={toggleEditor}
      >
        <div>
          <div className="flex h-[20rem] w-[24rem] items-center justify-center overflow-scroll bg-white dark:bg-void">
            <ViewOptions />
          </div>
          <div className="hidden">
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
        <SideVaul.Footer>
          <FlexRow className="w-full items-center justify-end">
            <ButtSex onClick={save} loading={saving} inverted size="sm">
              <span className="px-2">
                {saving ? "Saving . . . ." : "Save photo"}
              </span>
            </ButtSex>
          </FlexRow>
        </SideVaul.Footer>
      </FlatWindow>
    </SideVaul>
  );
};

const TransformView = () => {
  const { imageData, isDragging, handleDragEnd, handleDragStart } =
    use(AccountCtx)!;
  const handleZoom = useCallback(
    (zfn: VoidFunction) => () => {
      zfn();
    },
    [],
  );
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
    >
      {({ zoomIn, zoomOut }) => {
        return (
          <>
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass={`!w-full !h-full ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            >
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                {imageData ? (
                  <Image
                    src={imageData}
                    alt="User profile"
                    className="h-full w-full object-cover"
                    onMouseDown={handleDragStart}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                  />
                ) : (
                  <span className="text-gray-400">No image uploaded</span>
                )}
              </div>
            </TransformComponent>
            {imageData && (
              <div className="absolute bottom-2 left-1/2 z-40 flex space-x-2 -translate-x-1/2 transform">
                <ButtSqx
                  onClick={handleZoom(zoomIn)}
                  icon={MagnifyingGlassPlusIcon}
                />

                <ButtSqx
                  onClick={handleZoom(zoomOut)}
                  icon={MagnifyingGlassMinusIcon}
                />
              </div>
            )}
          </>
        );
      }}
    </TransformWrapper>
  );
};
