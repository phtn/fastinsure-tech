import { createElement, forwardRef, type SVGAttributes } from "react";
import type { SVGData } from "./types";

export const FastOutlineFactory = forwardRef<
  SVGSVGElement,
  SVGData & SVGAttributes<SVGPathElement>
>(
  (
    { title, titleId, pathData, stroke, strokeWidth, className, ...props },
    ref,
  ) => {
    return /*#__PURE__*/ createElement(
      "svg",
      Object.assign(
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: strokeWidth ?? 1.5,
          stroke: stroke ?? "currentColor",
          ref: ref,
          className,
          "aria-hidden": !titleId,
          "aria-labelledby": titleId,
          "data-slot": "icon",
        },
        props,
      ),
      title
        ? /*#__PURE__*/ createElement(
            "title",
            {
              id: titleId,
            },
            title,
          )
        : null,
      /*#__PURE__*/ createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: pathData, // Dynamic path data
      }),
    );
  },
);

FastOutlineFactory.displayName = "FastOutlineFactory";
