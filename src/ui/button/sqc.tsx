export const Sqc = ({
  width = 100,
  height = 100,
  fill = "currentColor",
  stroke = "currentColor",
  strokeWidth = 2,
  ...props
}) => {
  // Original path scaled to a 24x24 viewbox
  const originalPath = "M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9";

  // Calculate the scaling factor
  const scaleX = width / 24;
  const scaleY = height / 24;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}
    >
      <path
        d={originalPath}
        transform={`scale(${scaleX}, ${scaleY})`}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
