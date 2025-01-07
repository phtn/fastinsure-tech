import { useVex } from "@/app/ctx/convex";
import { onAwait } from "@/app/ctx/toasts";
import { Err } from "@/utils/helpers";
import { useToggle } from "@/utils/hooks/useToggle";

import { useCallback, useRef, useState } from "react";

import type { ChangeEvent } from "react";

export const useFiles = () => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [urlList, setUrlList] = useState<(string | null)[]>([]);

  const { files } = useVex();

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { open, toggle } = useToggle();

  const browseFiles = useCallback(() => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }, [inputFileRef]);

  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      if (!open) toggle();
      const files = Array.from(e.target.files);
      setFileList((prev) => [...prev, ...files]);
      if (fileList.length === 0) {
        [...files].forEach(loadFile);
      } else {
        [...fileList, ...files].forEach(loadFile);
      }
    },
    [fileList, toggle, open],
  );

  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  const clearFiles = useCallback(() => {
    if (!inputFileRef.current) return;
    setFileList([]);
    inputFileRef.current.value = "";
    console.log(fileList);
  }, [fileList]);

  // const createUrl = useCallback(
  //   async (file: File) => {
  //     if (file) {
  //       return await files.create(file);
  //     }
  //   },
  //   [files],
  // );

  const generateUrls = useCallback(async () => {
    if (fileList.length) {
      fileList.forEach((file) => {
        files
          .create(file)
          .then((storageId) => {
            setUrlList((prev) => [...prev, storageId]);
          })
          .catch(Err(setLoading));
      });
    }
  }, [fileList, files]);

  const submitFn = useCallback(async () => {
    setLoading(true);
    await onAwait(
      generateUrls,
      "Uploading...",
      `Uploaded ${fileList.length} files.`,
    ).finally(() => {
      setLoading(false);
      setFileList([]);
      if (inputFileRef.current) inputFileRef.current.value = "";
    });
  }, [generateUrls, fileList.length]);

  return {
    open,
    toggle,
    urlList,
    fileList,
    onFileChange,
    inputFileRef,
    browseFiles,
    clearFiles,
    removeFile,
    canvasRef,
    submitFn,
    loading,
  };
};

const loadFile = (file: File, id: number) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.getElementById(
        `canvas-${file.name}-${id}`,
      ) as HTMLCanvasElement;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        console.error("Unable to get 2D context");
        return;
      }

      const dw = img.width * 0.4;
      const dh = img.height * 0.42;

      canvas.width = dw;
      canvas.height = dh;

      ctx.drawImage(img, 0, 0, dw, dh);

      ctx.putImageData(ctx.getImageData(0, 0, dw, dh), 0, 0);

      canvas.toDataURL("image/webp");
    };
    img.src = e.target?.result as string;
  };
  if (file.type === "application/pdf") {
    reader.readAsArrayBuffer(file);
    return;
  }
  reader.readAsDataURL(file);
};
