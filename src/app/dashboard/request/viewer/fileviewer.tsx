import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { guid } from "@/utils/helpers";
import {
  ArrowDownTrayIcon,
  ViewfinderCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Image, Spinner } from "@nextui-org/react";
import { memo, useCallback, useMemo } from "react";
import { downloadFile } from "./utils";

interface IAttachedFiles {
  attachedFiles: (string | null)[];
  pending: boolean;
}
export const AttachedFiles = ({ attachedFiles, pending }: IAttachedFiles) => {
  const attachments = useMemo(
    () => createList<IAttachmentItem>(attachedFiles),
    [attachedFiles],
  );
  return (
    <div className="group/attachments relative col-span-2 h-[calc(84vh)] w-full border-l-[0.33px] border-primary-300">
      <FileCounter pending={pending} count={attachedFiles.length} />
      <HyperList data={attachments} component={Item} keyId="id" />
      <div className="min-h-[32rem]"></div>
    </div>
  );
};
interface IFileCounter {
  count: number;
  pending: boolean;
}
const FileCounter = ({ count, pending }: IFileCounter) => (
  <FlexRow
    className={cn(
      "absolute left-2 top-2 z-50 h-fit items-center justify-between group-hover/attachments:-top-10",
      "transition-all duration-500 ease-out",
      { "-top-10": count === 0 },
    )}
  >
    <div className="flex h-8 w-fit items-center space-x-4 rounded-lg bg-vanilla/60 pe-2 ps-1 text-sm font-medium capitalize leading-none tracking-tight backdrop-blur-xl">
      <div className="flex size-6 items-center justify-center rounded-lg bg-primary-50/50">
        {pending ? <Spinner size="sm" /> : count}
      </div>
      <h2 className="text-slate-950">Attached Files</h2>
    </div>
  </FlexRow>
);

interface IAttachmentItem {
  id: number;
  src: string | undefined;
  download: string;
}
const AttachmentItem = ({ src, download }: IAttachmentItem) => {
  const handleDownload = useCallback(async () => {
    await downloadFile(src, download);
  }, [src, download]);
  return (
    <div className={`group/file relative overflow-hidden`}>
      <Image
        src={src}
        alt={`request-file-${download}`}
        className="h-auto w-full"
        radius="none"
      />

      <FlexRow
        className={`absolute -top-10 right-0 z-50 h-10 justify-between bg-chalk/40 px-2 backdrop-blur-xl transition-all duration-300 group-hover/file:top-0 dark:bg-void/80`}
      >
        <FlexRow className="space-x-1">
          <ButtSqx size="md" icon={ViewfinderCircleIcon} />
          <ButtSqx
            size="md"
            icon={ArrowDownTrayIcon}
            onClick={handleDownload}
          />
        </FlexRow>

        <ButtSqx size="md" icon={XMarkIcon} />
      </FlexRow>
    </div>
  );
};
const Item = memo(AttachmentItem);

const createList = <T,>(array: (string | null)[]) =>
  array
    .slice()
    .map(
      (src, i) =>
        ({
          id: i + 1,
          src,
          download: "FIT" + guid().split("-")[2],
        }) as T,
    )
    .reverse();
