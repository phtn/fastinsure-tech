import { type INode, parse, stringify } from "svgson";

export async function svg2Path(svgString: string) {
  const parsed = await parse(svgString);

  const traverseAndConvert = (node: INode): INode => {
    const { name, attributes, children } = node;

    switch (name) {
      case "circle": {
        const { cx = 0, cy = 0, r = 0 } = attributes;
        const d = `M ${+cx + +r},${cy} A ${r},${r} 0 1,0 ${+cx - +r},${cy} A ${r},${r} 0 1,0 ${+cx + +r},${cy}`;
        return { ...node, name: "path", attributes: { d } };
      }

      case "rect": {
        const { x = 0, y = 0, width = 0, height = 0 } = attributes;
        const d = `M ${x},${y} H ${+x + +width} V ${+y + +height} H ${x} Z`;
        return { ...node, name: "path", attributes: { d } };
      }

      case "line": {
        const { x1 = 0, y1 = 0, x2 = 0, y2 = 0 } = attributes;
        const d = `M ${x1},${y1} L ${x2},${y2}`;
        return { ...node, name: "path", attributes: { d } };
      }

      case "polygon": {
        const { points = "" } = attributes;
        const d = `M ${points} Z`;
        return { ...node, name: "path", attributes: { d } };
      }

      case "polyline": {
        const { points = "" } = attributes;
        const d = `M ${points}`;
        return { ...node, name: "path", attributes: { d } };
      }

      default:
        // Recursively traverse children for non-path elements
        return {
          ...node,
          children: children.map(traverseAndConvert),
        };
    }
  };

  const converted = traverseAndConvert(parsed);
  return stringify(converted);
}

const svgInput = `<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" /></svg>`;
svg2Path(svgInput)
  .then((result) => console.log(result))
  .catch((error) => console.error("Conversion failed:", error));
