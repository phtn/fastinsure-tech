"use client";

import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { FlexRow } from "@/ui/flex";
import { HyperList } from "@/ui/list";
import { Err, guid, opts } from "@/utils/helpers";
import {
  ArrowDownTrayIcon,
  ViewfinderCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Image, Spinner } from "@nextui-org/react";
import { memo, useCallback, useEffect, useState } from "react";
import { downloadFile } from "./utils";
import { PDFDocument } from "./fileuploader";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface IAttachedFiles {
  attachedFiles: (string | null)[];
  pending: boolean;
}
export const AttachedFiles = ({ attachedFiles, pending }: IAttachedFiles) => {
  const [attachments, setAttachments] = useState<IAttachmentItem[]>();

  const createList = useCallback(async () => {
    setAttachments(await urlsToFiles(attachedFiles));
  }, [attachedFiles]);

  useEffect(() => {
    createList().catch(Err);
  }, [createList]);

  return (
    <div className="group/attachments relative col-span-2 h-[calc(84vh)] w-full border-l-[0.33px] border-primary-300">
      <FileCounter pending={pending} count={attachedFiles.length} />
      <HyperList
        data={attachments}
        container="h-[calc(84vh)] overflow-y-scroll pb-32"
        component={Item}
        keyId="id"
      />
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
  url: string | undefined;
  filename: string;
  file: File;
}
const AttachmentItem = ({ url, filename, file }: IAttachmentItem) => {
  const handleDownload = useCallback(async () => {
    await downloadFile(url, filename);
  }, [url, filename]);

  const ItemViewerOptions = useCallback(() => {
    const isPDF = file.type === "application/pdf";
    const options = opts(
      <PDFDocument
        file={file}
        className="flex h-[600px] w-auto items-center justify-center"
      />,
      <Image
        src={url}
        alt={`request-file-${filename}`}
        className="h-auto w-full"
        radius="none"
      />,
    );
    return <>{options.get(isPDF)}</>;
  }, [url, filename, file]);

  return (
    <div className={`group/file relative overflow-hidden`}>
      <ItemViewerOptions />

      <FlexRow
        className={`absolute -top-10 right-0 z-50 h-12 items-center justify-between bg-void px-2 transition-all duration-300 group-hover/file:top-0 dark:bg-void/80`}
      >
        <FlexRow className="items-center space-x-1">
          <ButtSqx
            size="md"
            icon={ViewfinderCircleIcon}
            iconStyle="text-chalk"
            variant="steel"
          />
          <ButtSqx
            size="md"
            icon={ArrowDownTrayIcon}
            onClick={handleDownload}
            iconStyle="text-chalk"
            variant="steel"
          />
        </FlexRow>

        <ButtSqx
          size="md"
          icon={XMarkIcon}
          iconStyle="text-chalk"
          variant="steel"
        />
      </FlexRow>
    </div>
  );
};
const Item = memo(AttachmentItem);

async function urlsToFiles(urls: (string | null)[]) {
  const filePromises = urls?.map(async (url, i) => {
    if (!url) url = "_";
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = "FIT" + guid().split("-")[2];
    const file = new File([blob], filename, { type: blob.type });
    return { url, filename, file, id: i + 1 };
  });

  return Promise.all(filePromises);
}
