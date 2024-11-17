import { type DualIcon } from "@/app/types";
import { type SpecialEntity } from "@/lib/docai/resource";
import { cn } from "@/lib/utils";
import { InputFieldName } from "@/ui/input";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Image } from "@nextui-org/react";
import { FileSymlinkIcon, ScanIcon, ScanTextIcon } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

export const Wrapper = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "mt-1.5 h-[calc(90vh)] bg-gradient-to-tr from-stone-200/30 via-zinc-200/30 to-default-200/30",
      "overflow-scroll rounded-[3px] border-[0.33px] border-primary-400",
    )}
  >
    {children}
  </div>
);

const FormTitle = (props: { title?: string }) => (
  <div className="flex min-w-28 items-center justify-between space-x-4 whitespace-nowrap">
    <p className="font-arc font-semibold tracking-tight text-foreground drop-shadow-sm">
      {props.title}
    </p>
  </div>
);

interface FormHeaderProps {
  isLoading: boolean;
  isValid: boolean;
  children?: ReactNode;
  title?: string;
  icon?: DualIcon;
}
export const FormHeader = (props: FormHeaderProps) => {
  return (
    <div className="flex w-full items-center gap-2 border-b-[0.33px] border-primary-500 bg-primary-600/30 px-4 py-3.5 backdrop-blur-xl">
      <FileSymlinkIcon className="size-4 stroke-[2px]" />
      <FormTitle title={props.title} />
      {props.children}
    </div>
  );
};

interface RowProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export const Row = ({ children }: RowProps) => (
  <section className="flex w-full px-4">
    <div className="md:w-[calc(50vw-200px)]">{children}</div>
  </section>
);

interface CardGroup {
  children: ReactNode;
  title: string;
  subtext?: string;
}

export const CardGroup = ({ children, title }: CardGroup) => (
  <div className="w-full space-y-4 border-b-[0.33px] border-primary-300 bg-primary-100/50 px-4 py-8 backdrop-blur-xl dark:bg-primary-100/40">
    <p className="font-inter font-medium tracking-tighter">{title}</p>
    {children}
  </div>
);

export const SpecialGroup = ({ children, title, subtext }: CardGroup) => (
  <div className="col-span-2 h-full w-full space-y-3 border-b-[0.33px] border-l-[0.33px] border-primary-300 bg-primary-100/50 px-4 py-6 backdrop-blur-xl dark:bg-primary-100/40">
    <header className="flex items-start gap-3">
      <ScanTextIcon className="size-6 stroke-1" />
      <section className="space-y-1 leading-none">
        <p className="font-inter font-medium tracking-tight">{title}</p>
        <p className="font-arc text-xs font-normal tracking-wide text-primary-600">
          {subtext}
        </p>
      </section>
    </header>
    {children}
  </div>
);

interface ImageViewerProps {
  imageData: string | undefined;
  clearFile: VoidFunction;
}
export const ImageViewer = ({ imageData, clearFile }: ImageViewerProps) => (
  <div className="-mt-[1px] h-[22.4rem] w-full overflow-hidden rounded-lg border-[0.33px] border-primary-300 bg-primary-50 dark:border-primary-400">
    <div className="group relative flex size-full cursor-pointer items-center overflow-hidden rounded-md">
      <Image
        src={imageData}
        alt="file-to-scan"
        className="relative top-0 rounded-md scale-90"
      />
      <Button
        isIconOnly
        size="sm"
        color="primary"
        variant={`solid`}
        onPress={clearFile}
        className="absolute right-1 top-1 z-50 hidden size-6 items-center rounded-full border group-hover:flex"
      >
        <XMarkIcon className={"size-4 text-background"} />
      </Button>
    </div>
  </div>
);

export const HSeparator = () => (
  <div
    className={cn(
      "my-16 -ml-6 flex h-[0.33px] w-full",
      "bg-gradient-to-r from-primary-400 via-primary-300/50 to-transparent",
      "rounded-full",
    )}
  />
);

export const HiddenCanvas = () => (
  <div className="hidden space-y-4 p-4">
    <canvas id="grayscale-canvas" className="h-auto w-full" />
  </div>
);

export const ScanResults = (props: { entities: SpecialEntity[] | null }) => {
  return (
    <div className="my-1 h-[510px] space-y-2 overflow-y-scroll px-2 pt-1">
      {props?.entities?.map((entity, index) => (
        <InputFieldName
          key={index}
          index={index}
          icon={ScanIcon}
          className="w-full"
          label={entity.type}
          defaultValue={entity.mentionText}
          type="text"
        />
      ))}
    </div>
  );
};

interface ScanDetailProps {
  elapsed: number;
  format: string | undefined;
  size: number | undefined;
}
export const ScanDetail = ({ elapsed, format, size }: ScanDetailProps) => (
  <div className="flex h-12 w-full items-center border-[0.33px] border-primary/20 px-2 text-xs font-light uppercase">
    {size?.toFixed(2) ?? null}mb | {format} | {elapsed ?? null}
  </div>
);

interface ScanButtonProps {
  loading: boolean;
  imageData: string | undefined;
  onPress: VoidFunction;
}
export const ScanButton = ({
  imageData,
  loading,
  onPress,
}: ScanButtonProps) => (
  <div className="pl-2">
    <Button
      size="md"
      radius="sm"
      color="primary"
      isLoading={loading}
      disabled={!imageData}
      variant={imageData ? "solid" : "flat"}
      className="w-fit font-inter font-medium tracking-tight"
      onPress={onPress}
    >
      Scan document
    </Button>
  </div>
);
