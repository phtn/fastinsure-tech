import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { getFileType, guid } from "@/utils/helpers";
import { useVex } from "@ctx/convex";
import { onError } from "@ctx/toasts";
import { grayscale } from "@/utils/image";
import {
  SupportedFilesSchema,
  type MimeType,
  type RawDocument,
} from "@/lib/docai/resource";

export const useFile = () => {
  const { request } = useVex();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [rawDocument, setRawDocument] = useState<RawDocument | null>(null);
  const [imageData, setImageData] = useState<string>();
  const [size, setSize] = useState<number>(0);
  const [format, setFormat] = useState<string>("");
  const [filename] = useState(() => guid());

  const inputRef = useRef<HTMLInputElement>(null);

  const clearFile = () => {
    setSelectedFile(undefined);
    setImageData(undefined);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSize = file && file.size / 1000000;
    if (fileSize > 10) {
      onError("File size is too large");
      return;
    }
    setSize(fileSize);
    const fileFormat = getFileType(file.type);
    const validFormat = SupportedFilesSchema.safeParse(fileFormat).success;
    if (!validFormat) {
      onError("File format not supported.");
      return;
    }
    setFormat(fileFormat);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result?.toString();
      setImageData(result);

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
    };

    reader.readAsDataURL(file);
  };

  const generateUrl = async (e: FormEvent) => {
    e.preventDefault();
    return await request.storage.generateUrl();
  };

  return {
    size,
    format,
    filename,
    selectedFile,
    handleFileChange,
    rawDocument,
    generateUrl,
    imageData,
    clearFile,
    inputRef,
  };
};
