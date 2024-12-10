import { useRef, useState, useEffect, type FC } from "react";

const DimeTracker: FC = () => {
  // Method 1: useRef with getBoundingClientRect()
  const divRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  // Method 2: ResizeObserver Hook
  const [resizeObserverDimensions, setResizeObserverDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Method 1: Get dimensions on mount and window resize
    const updateDimensions = () => {
      if (divRef.current) {
        const { width, height } = divRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Initial call
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    // Method 2: ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setResizeObserverDimensions({ width, height });
      }
    });

    // Observe the div
    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div
        ref={divRef}
        className="w-full resize overflow-auto bg-blue-100 p-4"
        style={{ minHeight: "200px" }}
      >
        <h2 className="mb-4 text-xl font-bold">Resize Me!</h2>

        <div className="space-y-2">
          <h3 className="font-semibold">Method 1 (getBoundingClientRect):</h3>
          <p>Width: {Math.round(dimensions.width)}px</p>
          <p>Height: {Math.round(dimensions.height)}px</p>

          <h3 className="mt-4 font-semibold">Method 2 (ResizeObserver):</h3>
          <p>Width: {Math.round(resizeObserverDimensions.width)}px</p>
          <p>Height: {Math.round(resizeObserverDimensions.height)}px</p>
        </div>
      </div>
    </div>
  );
};

export default DimeTracker;
