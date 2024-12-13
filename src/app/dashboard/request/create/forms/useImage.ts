import {
  type MimeType,
  SupportedFilesSchema,
  type RawDocument,
} from "@/lib/docai/resource";
import { errHandler, getFileType } from "@/utils/helpers";
import { grayscale } from "@/utils/image";
import { type FormEvent, useRef, useState } from "react";

export const useImageFile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [validFormat, setValidFormat] = useState(false);
  const [validSize, setValidSize] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [rawDocument, setRawDocument] = useState<RawDocument | null>(null);
  const [fmt, setFmt] = useState<string>();
  const [fsize, setFSize] = useState<number>();

  const inputRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve) => {
      setValidFormat(getFileType(file.type) in SupportedFilesSchema);
      setFmt(getFileType(file.type));

      const fileSize = file.size / 1000000;
      setFSize(fileSize);

      const isValidSize = fileSize < 10;
      setValidSize(isValidSize);
      if (!isValidSize) {
        console.error("Invalid File Size.", `Use files below 10MB.`);
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        // Display original image
        const image = e.target?.result;
        setImageData(image as string);

        // Create new image
        const img = new Image();
        img.onload = () => {
          const canvas = document.getElementById(
            "grayscale-canvas",
          ) as HTMLCanvasElement;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            console.error("Unable to get 2D context");
            return;
          }

          // Calculate new dimensions
          const dw = img.width * 0.4;
          const dh = img.height * 0.42;

          canvas.width = dw;
          canvas.height = dh;

          // Draw resized image
          ctx.drawImage(img, 0, 0, dw, dh);

          // Convert to grayscale
          const grayscaleData = grayscale(ctx, dw, dh);

          ctx.putImageData(grayscaleData, 0, 0);

          // console.log(canvas.toDataURL("image/webp"), dh, dw);

          // Set processed images
          const content = canvas.toDataURL("image/webp").split(",")[1]!;
          const mimeType = "image/webp" as MimeType;
          setRawDocument({ content, mimeType });
        };

        img.src = e.target?.result as string;

        resolve(img.src);
      };
      reader.readAsDataURL(file);
    });

  const getFile = (file: File) =>
    readFile(file)
      .then((data) => setImageData(data))
      .catch(errHandler(setLoading));

  const clearFile = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRawDocument(null);
    setFmt(undefined);
    setFSize(undefined);
  };

  return {
    readFile,
    clearFile,
    inputRef,
    getFile,
    rawDocument,
    imageData,
    validFormat,
    validSize,
    loading,
    fmt,
    fsize,
  };
};
