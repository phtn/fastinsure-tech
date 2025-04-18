"use client";

import { type ClassName } from "@/app/types";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { ButtSqx } from "@/ui/button/button";
import { ButtSex } from "@/ui/button/ripple";
import { FlexRow } from "@/ui/flex";
import { LoaderSm } from "@/ui/loader";
import { SideVaul } from "@/ui/sidevaul";
import { FlatWindow } from "@/ui/window";
import { Err } from "@/utils/helpers";
import type { ChangeEvent, ReactNode, RefObject, } from "react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useFiles } from "../hooks/useFiles";
import { useRequestViewer } from "./ctx";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
export const FileUpload = () => {
  const {
    browseFiles,
    inputFileRef,
    removeFile,
    clearFiles,
    fileList,
    urlList,
    open,
    toggle,
    loading,
    submitFn,
    onFileChange,
  } = useFiles();

  const { updateRequestFiles } = useRequestViewer();

  useEffect(() => {
    if (urlList.length) {
      updateRequestFiles(urlList).catch(Err);
    }
  }, [updateRequestFiles, urlList]);

  // return true && <Trigger inputRef={inputFileRef} onFileChange={onFileChange} browseFn={browseFiles} />
  return true && (
    <div className="">
      <Trigger inputRef={inputFileRef} onFileChange={onFileChange} browseFn={browseFiles} />

      <FileUploadViewer
        open={open}
        toggle={toggle}
        loading={loading}
        submitFn={submitFn}
        cancel={clearFiles}
        count={fileList.length}
        browseFiles={browseFiles}
      >
        <div>
          <div className="h-[30rem] w-[360px] overflow-scroll bg-white dark:bg-void">
            <DataViewer removeFile={removeFile} files={fileList} />
          </div>
        </div>
      </FileUploadViewer>
    </div>
  );
};

interface TriggerProps {
  browseFn: VoidFunction
  inputRef: RefObject<HTMLInputElement | null>
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Trigger = ({browseFn, inputRef, onFileChange}: TriggerProps) => (
  <FlexRow className="rounded-2xl">
    <ButtSex size="md" end="cloud-upload" onClick={browseFn}>
      Upload Files
    </ButtSex>
    <input
    multiple
    type="file"
    ref={inputRef}
    onChange={onFileChange}
    className="pointer-events-none absolute size-0 opacity-0"
    />
  </FlexRow>
)

interface DataViewerProps {
  removeFile: (index: number) => void;
  files: File[] | undefined;
}
const DataViewer = ({ files, removeFile }: DataViewerProps) => {
  const handleFileRemove = (i: number) => () => removeFile(i);
  const fileSize = (size: number) => {
    const kb = size / 1000;
    if (kb < 1000) {
      return `${Math.round(kb)} KB`;
    }
    return `${Math.round(kb / 1000)} MB`;
  };
  return (
    <div>
      {files
        ?.map((file, i) => (
          <div
            key={`${file.name}_${i}`}
            className="group/image relative overflow-hidden"
          >
            <div className="absolute -top-8 z-50 flex w-full items-center justify-between bg-void/60 px-2 text-xs text-chalk backdrop-blur-xl transition-all duration-300 group-hover/image:top-0">
              <div className="items-center space-x-3">
                <span>{file.name.substring(0, 21)}</span>
                <span className="opacity-30">|</span>
                <span className="uppercase">{file.type.split("/")[1]}</span>
                <span className="opacity-30">|</span>
                <span>{fileSize(file.size)}</span>
              </div>
              <ButtSqx
                size="sm"
                icon="close"
                variant="steel"
                iconStyle="text-chalk size-5"
                onClick={handleFileRemove(i)}
              />
            </div>
            {file.type === "application/pdf" ? (
              <PDFDocument file={file} />
            ) : (
              <canvas
                id={`canvas-${file.name}-${i}`}
                className="h-auto w-full bg-gray-300"
              />
            )}
          </div>
        ))
        .reverse()}
    </div>
  );
};

interface FileViewerProps {
  open: boolean;
  toggle: VoidFunction;
  submitFn: VoidFunction;
  loading: boolean;
  cancel: VoidFunction;
  children?: ReactNode;
  count: number;
  browseFiles: VoidFunction;
}
const FileUploadViewer = ({
  open,
  toggle,
  submitFn,
  loading,
  children,
  cancel,
  count,
  browseFiles,
}: FileViewerProps) => {
  return (
    <SideVaul open={open} onOpenChange={toggle} direction="right">
      <FlatWindow
        title={
          <div className="space-x-2">
            <span>Upload files</span> <span>{count}</span>
          </div>
        }
        variant="adam"
        closeFn={toggle}
        icon={"document-outline"}
      >
        {children}
        <SideVaul.Footer>
          <FlexRow className="w-full items-center justify-between space-x-1.5">
            <ButtSex onClick={cancel} end={"close"}>
              <span className="">clear all</span>
            </ButtSex>
            <div className="flex gap-1.5">
              <ButtSex onClick={browseFiles}>
                <Icon name="cloud-upload" className="size-4" />
              </ButtSex>
              <ButtSex
                loading={loading}
                onClick={submitFn}
                disabled={count === 0}
                start={"square-arrow-up-right"}
                inverted
              >
                <div className="flex items-center justify-between gap-3">
                  <span>
                    {loading
                      ? "Saving . . . ."
                      : count > 1
                        ? "Upload all"
                        : "Upload"}
                  </span>
                  <div
                    className={cn(
                      "flex items-center justify-center rounded-[5px] bg-primary-300/40 px-1.5 py-1 leading-none text-chalk",
                      { hidden: count === 0 },
                    )}
                  >
                    {count}
                  </div>
                </div>
              </ButtSex>
            </div>
          </FlexRow>
        </SideVaul.Footer>
      </FlatWindow>
    </SideVaul>
  );
};

export const PDFDocument = (props: {
  file: File | undefined;
  className?: ClassName;
}) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (!numPages) return;
    if (numPages > pageNumber) {
      setPageNumber((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (!numPages) return;
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return !props.file ? (
    <LoaderSm />
  ) : (
    <div className={cn("relative h-[480px] animate-enter", props.className)}>
      <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={360} />
      </Document>
      <div className="absolute bottom-4 right-4 z-[100] flex items-center rounded-lg border-[0.33px] border-primary-500 bg-white/40 text-xs shadow-md backdrop-blur-lg">
        <ButtSqx
          size="sm"
          disabled={pageNumber === 1}
          icon={"arrow-left-01"}
          onClick={prevPage}
        />
        <p className="font-jet">
          {pageNumber} of {numPages}
        </p>
        <ButtSqx
          size="sm"
          icon={"arrow-left-01"}
          iconStyle="rotate-180"
          onClick={nextPage}
          disabled={pageNumber === numPages}
        />
      </div>
    </div>
  );
};
