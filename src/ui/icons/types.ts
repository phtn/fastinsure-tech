import type { SVGAttributes } from "react";

export interface SVGData extends SVGAttributes<SVGPathElement> {
  title?: string;
  titleId?: string;
  pathData: string; // New prop for the `d` attribute of the `path` element
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

export type SVGList = {
  title: string;
  data: SVGData;
};

export interface SVGNode {
  name: string; // Tag name (e.g., "circle", "rect", "path")
  type: string; // Type of node (e.g., "element")
  attributes: Record<string, string | number | undefined>; // Element attributes
  children: SVGNode[]; // Nested child elements
  value?: string; // Text content, if any
}
