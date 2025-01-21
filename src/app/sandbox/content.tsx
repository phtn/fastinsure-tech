// "use client";

// import { cn } from "@/lib/utils";
// import { ButtSqx } from "@/ui/button/button";
// import { ButtSex } from "@/ui/button/ripple";
// import { FlexRow } from "@/ui/flex";
// import { Screen } from "@/ui/screen";
// import { SideVaul } from "@/ui/sidevaul";
// import { FlatWindow } from "@/ui/window";
// import {
//   ArrowUpTrayIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   PlusIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import {
//   DocumentArrowUpIcon,
//   DocumentIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/solid";
// import { Image, Link } from "@nextui-org/react";
// import { type ReactNode, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// import { useFiles } from "../dashboard/request/hooks/useFiles";
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// export const Sandbox = () => {
//   const {
//     browseFiles,
//     inputFileRef,
//     removeFile,
//     clearFiles,
//     fileList,
//     urlList,
//     open,
//     toggle,
//     loading,
//     submitFn,
//     onFileChange,
//   } = useFiles();

//   // const files = useMemo(() => selectedFiles, [selectedFiles]);

//   return (
//     <Screen>
//       <Header />
//       <FlexRow className="border_ relative size-96 dark:border-icon">
//         <ButtSex end={DocumentArrowUpIcon} size="md" onClick={browseFiles}>
//           Upload Files
//         </ButtSex>
//         <input
//           multiple
//           type="file"
//           ref={inputFileRef}
//           onChange={onFileChange}
//           className="inert pointer-events-none absolute size-0 opacity-0"
//         />
//         <ButtSex end={DocumentArrowUpIcon} size="md" onClick={toggle}>
//           Toggle Viewer
//         </ButtSex>
//       </FlexRow>

//       <div className="flex h-96 w-full border">
//         <div className="w-fit">
//           <p>{fileList.length}</p>
//           {fileList.map((file) => (
//             <div key={file.name}>{file.name}</div>
//           ))}
//         </div>
//         <div>
//           <p>{urlList.length}</p>
//           {urlList.map((url) => (
//             <div key={url}>{url}</div>
//           ))}
//         </div>
//       </div>
//       <FileViewer
//         open={open}
//         toggle={toggle}
//         loading={loading}
//         submitFn={submitFn}
//         cancel={clearFiles}
//         count={fileList.length}
//         browseFiles={browseFiles}
//       >
//         <div>
//           <div className="h-[30rem] w-[360px] overflow-scroll bg-white dark:bg-void">
//             <DataViewer removeFile={removeFile} files={fileList} />
//           </div>
//         </div>
//       </FileViewer>
//       <Screen.PadLg />
//     </Screen>
//   );
// };

// interface DataViewerProps {
//   removeFile: (index: number) => void;
//   files: File[] | undefined;
// }
// const DataViewer = ({ files, removeFile }: DataViewerProps) => {
//   const handleFileRemove = (i: number) => () => removeFile(i);
//   const fileSize = (size: number) => {
//     const kb = size / 1000;
//     if (kb < 1000) {
//       return `${Math.round(kb)} KB`;
//     }
//     return `${Math.round(kb / 1000)} MB`;
//   };
//   return (
//     <div className="space-y-2 bg-steel">
//       {files
//         ?.map((file, i) => (
//           <div
//             key={`${file.name}_${i}`}
//             className="group/image relative overflow-hidden"
//           >
//             <div className="absolute -top-8 z-50 flex w-full items-center justify-between bg-void/60 px-2 text-xs text-chalk backdrop-blur-xl transition-all duration-300 group-hover/image:top-0">
//               <div className="items-center space-x-3">
//                 <span>{file.name.substring(0, 21)}</span>
//                 <span className="opacity-30">|</span>
//                 <span className="uppercase">{file.type.split("/")[1]}</span>
//                 <span className="opacity-30">|</span>
//                 <span>{fileSize(file.size)}</span>
//               </div>
//               <ButtSqx
//                 size="sm"
//                 icon={XCircleIcon}
//                 variant="steel"
//                 iconStyle="text-chalk size-5"
//                 onClick={handleFileRemove(i)}
//               />
//             </div>
//             {file.type === "application/pdf" ? (
//               <PDFDocument file={file} />
//             ) : (
//               <canvas
//                 id={`canvas-${file.name}_${i}`}
//                 className="h-auto w-full bg-gray-300"
//               />
//             )}
//           </div>
//         ))
//         .reverse()}
//     </div>
//   );
// };

// interface FileViewerProps {
//   open: boolean;
//   toggle: VoidFunction;
//   submitFn: VoidFunction;
//   loading: boolean;
//   cancel: VoidFunction;
//   children?: ReactNode;
//   count: number;
//   browseFiles: VoidFunction;
// }
// const FileViewer = ({
//   open,
//   toggle,
//   submitFn,
//   loading,
//   children,
//   cancel,
//   count,
//   browseFiles,
// }: FileViewerProps) => {
//   return (
//     <SideVaul open={open} onOpenChange={toggle} direction="right">
//       <FlatWindow
//         title={"Files"}
//         variant="god"
//         closeFn={toggle}
//         icon={DocumentIcon}
//       >
//         {children}
//         <SideVaul.Footer>
//           <FlexRow className="w-full items-center justify-between space-x-1.5">
//             <ButtSex onClick={cancel} end={XMarkIcon}>
//               <span className="">clear all</span>
//             </ButtSex>
//             <div className="flex gap-1.5">
//               <ButtSex onClick={browseFiles}>
//                 <PlusIcon className="size-4" />
//               </ButtSex>
//               <ButtSex
//                 loading={loading}
//                 onClick={submitFn}
//                 disabled={count === 0}
//                 start={ArrowUpTrayIcon}
//                 inverted
//               >
//                 <div className="flex items-center justify-between gap-3">
//                   <span>
//                     {loading
//                       ? "Saving . . . ."
//                       : count > 1
//                         ? "Upload all"
//                         : "Upload"}
//                   </span>
//                   <div
//                     className={cn(
//                       "flex items-center justify-center rounded-[5px] bg-primary-300/40 px-1.5 py-1 leading-none text-chalk",
//                       { hidden: count === 0 },
//                     )}
//                   >
//                     {count}
//                   </div>
//                 </div>
//               </ButtSex>
//             </div>
//           </FlexRow>
//         </SideVaul.Footer>
//       </FlatWindow>
//     </SideVaul>
//   );
// };

// const PDFDocument = (props: { file: File }) => {
//   const [numPages, setNumPages] = useState<number>();
//   const [pageNumber, setPageNumber] = useState<number>(1);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   const nextPage = () => {
//     if (!numPages) return;
//     if (numPages > pageNumber) {
//       setPageNumber((prev) => prev + 1);
//     }
//   };
//   const prevPage = () => {
//     if (!numPages) return;
//     if (pageNumber > 1) {
//       setPageNumber((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="relative h-[480px]">
//       <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} width={360} />
//       </Document>
//       <div className="absolute bottom-4 right-4 z-[100] flex items-center rounded-lg border-[0.33px] border-primary-500 bg-white/40 text-xs shadow-md backdrop-blur-lg">
//         <ButtSqx
//           size="sm"
//           disabled={pageNumber === 1}
//           icon={ChevronLeftIcon}
//           onClick={prevPage}
//         />
//         <p className="font-jet">
//           {pageNumber} of {numPages}
//         </p>
//         <ButtSqx
//           size="sm"
//           icon={ChevronRightIcon}
//           onClick={nextPage}
//           disabled={pageNumber === numPages}
//         />
//       </div>
//     </div>
//   );
// };

// const Header = () => (
//   <FlexRow className="h-24 items-center">
//     <Link
//       href="/"
//       className="flex size-[24px] items-center justify-center rounded-full border-[0.33px] border-[#1B1F22]/50 bg-chalk xl:size-[32px]"
//     >
//       <Image
//         alt=""
//         src="/svg/logo_dark.svg"
//         className="size-[12px] rounded-none xl:size-[16px]"
//       />
//     </Link>
//     <h1 className="font-inst font-medium text-primary drop-shadow-lg xl:text-lg">
//       Sandbox
//     </h1>
//   </FlexRow>
// );
//
"use client";

export const Content = () => {
  return <main>Content</main>;
};
