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
import {Image, Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { downloadFile } from "./utils";
import { PDFDocument } from "./fileuploader";
import { pdfjs } from "react-pdf";
import { ErrorBoundary } from "react-error-boundary";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface IAttachedFiles {
  attachedFiles: (string | null)[];
  pending: boolean;
}

export const AttachedFiles = ({ attachedFiles, pending }: IAttachedFiles) => {
  const [attachments, setAttachments] = useState<IAttachmentItem[]>();

  const createList = useCallback(async () => {
    if (attachedFiles.length >= 1) {
      const files = await urlsToFiles(attachedFiles);
      return files;
    }
  }, [attachedFiles]);

  useEffect(() => {
    createList().then(setAttachments).catch(Err);
  }, [createList]);


  return (
    <div className="group/attachments relative col-span-2 h-[calc(84vh)] w-full border-l-[0.33px] border-primary-300">
      <FileCounter pending={pending} count={attachedFiles.length} />
      <ErrorBoundary FallbackComponent={FileViewerError}>
        <HyperList
          data={attachments}
          container="h-[calc(84vh)] overflow-y-scroll pb-32"
          component={AttachmentItem}
          keyId="id"
        />
      </ErrorBoundary>
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
      "absolute left-1 top-1 z-50 h-fit items-center justify-between group-hover/attachments:-top-10",
      "transition-all duration-500 ease-out",
      { "-top-10": count === 0 },
    )}
  >
    <div className="flex h-8 w-fit items-center space-x-1 rounded-md bg-cake/40 pe-3 ps-1 text-sm font-medium capitalize leading-none tracking-tight backdrop-blur-xl">
      <div className="flex size-5 items-center justify-center rounded-md font-bold">
        {pending ? <Spinner size="sm" /> : count}
      </div>
      <h2 className="text-slate-950">File{`${count > 1 ? "s" : ""}`}</h2>
    </div>
  </FlexRow>
);

interface IAttachmentItem {
  id: number;
  url: string;
  filename: string;
  file: File;
}

const AttachmentItem = ({ url, filename, file }: IAttachmentItem) => {
  const [error, setError] = useState<string | null>(null);

  const handleDownload = useCallback(async () => {
    try {
      await downloadFile(url, filename);
    } catch (err) {
      setError("Failed to download file");
      console.error("Download error:", err);
    }
  }, [url, filename]);

    const ItemViewerOptions = useCallback(() => {
    const isPDF = file.type === "application/pdf";


    if (error) {
      return (
        <div className="flex h-full items-center justify-center text-red-500">
          {error}
        </div>
      );
    }

    if (!url) {
      return (
        <div className="flex h-[300px] items-center justify-center">
          <Spinner size="lg" />
        </div>
      );
    }

    const options = opts(
      <PDFDocument
        file={file}
        className="flex h-[600px] w-auto items-center justify-center"
      />,
      <Image
        src={url}
        radius="none"
        alt={`request-file-${filename}`}
        className="aspect-auto h-auto w-full object-contain"
        isLoading={!url}
      />,
    );
    return <div className="h-fit">{options.get(isPDF)}</div>;
  }, [url, filename, file, error]);

  return (
    <div className="group/file relative overflow-hidden">
      <ItemViewerOptions />

      <FlexRow
        className={cn(
          "absolute -top-12 right-0 z-50 h-12 items-center justify-between bg-void px-2 transition-all duration-300",
          "group-hover/file:top-0 dark:bg-void/80",
          { "top-0": error },
        )}
      >
        <FlexRow className="items-center space-x-1">
          <ButtSqx
            size="md"
            icon={ViewfinderCircleIcon}
            iconStyle="text-chalk"
            variant="steel"
            disabled={!!error || !url}
          />
          <ButtSqx
            size="md"
            icon={ArrowDownTrayIcon}
            onClick={handleDownload}
            iconStyle={!url ? "text-gray-600" : "text-chalk"}
            variant="steel"
            disabled={!!error || !url}
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

const FileViewerError = ({ error }: { error: Error }) => (
  <div className="flex h-full items-center justify-center p-4 text-center text-red-500">
    <div>
      <p className="font-semibold">Error loading file viewer</p>
      <p className="text-sm">{error.message}</p>
    </div>
  </div>
);


async function urlsToFiles(
  urls: (string | null)[],
): Promise<IAttachmentItem[]> {
  if (!urls || urls.length === 0) {
    console.log("No URLs provided");
    return [];
  }

  const filePromises = urls.map(async (url, i) => {
    if (!url) return null;
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const filename = `FIT${guid().split("-")[2]}`;
      const file = new File([blob], filename, { type: blob.type });
      return { url, filename, file, id: i + 1 };
    } catch (error) {
      console.error("Error loading file:", error);
      return null;
    }
  });

  const results = await Promise.all(filePromises);

  const filteredResults = results.filter(
    (item): item is IAttachmentItem =>
      item !== null &&
      typeof item.url === "string" &&
      typeof item.filename === "string" &&
      item.file instanceof File &&
      typeof item.id === "number",
  );

  return filteredResults;
}
