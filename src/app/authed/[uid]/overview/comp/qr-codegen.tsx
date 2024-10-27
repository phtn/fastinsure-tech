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

export const QrCodegen = (props: { key: string | undefined }) => {
  const linkURL = `http://localhost:3000/hcode/${props.key}`;
  const [options] = useState<Options>({
    width: 256,
    height: 256,
    type: "svg" as DrawType,
    data: linkURL,
    image: "/svg/logo.svg",
    margin: 2,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: "Byte" as Mode,
      errorCorrectionLevel: "M" as ErrorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.5,
      margin: 0.5,
      crossOrigin: "anonymous",
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
          { offset: 1, color: "#a1a1aa" },
        ],
      },
    },
    backgroundOptions: {
      color: "transparent",
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

  return <div className="" ref={ref} />;
};
