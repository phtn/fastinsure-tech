import { useEffect, useRef, useState } from "react";
import type {
  Options,
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
} from "qr-code-styling";
import QRCodeStyling from "qr-code-styling";
import { useThemeCtx } from "@/app/ctx/theme";

export const QrCodegen = (props: { url: string | undefined }) => {
  const { theme } = useThemeCtx();
  const light = theme === "light";
  const [options] = useState<Options>({
    width: 256,
    height: 256,
    type: "svg" as DrawType,
    data: props.url,
    image: "/svg/logo.svg",
    margin: 1,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.5,
      margin: 0.5,
      crossOrigin: "same-origin",
    },
    dotsOptions: {
      color: "#09090b",
      gradient: {
        type: "radial", // 'linear'
        rotation: 0,
        colorStops: [
          { offset: 0.25, color: "#52525b" },
          { offset: 1, color: "#27272a" },
        ],
      },
      type: "dots" as DotType,
    },
    cornersSquareOptions: {
      color: "#18181b",
      type: "extra-rounded" as CornerSquareType,
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 180,
      //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
      // },
    },
    cornersDotOptions: {
      color: "#0369a1",
      // type: "none" as CornerDotType,
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: "#475569" },
          { offset: 1, color: "#64748b" },
        ],
      },
    },
    backgroundOptions: {
      color: light ? "transparent" : "#d4d4d8",
      round: 0.15,
      // gradient: {
      //   type: 'linear', // 'radial'
      //   rotation: 0,
      //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
      // },
    },
  });
  const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    if (!qrCode) return;
    qrCode.update(options);
  }, [qrCode, options]);

  return (
    <div
      className="h-72 rounded-md border-[0.33px] border-foreground/20 py-4"
      ref={ref}
    />
  );
};
