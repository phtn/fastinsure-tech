import { useEffect, useState } from "react";
import { useTime } from "framer-motion";

export const useGLMotion = () => {
  const ry = useTime();
  const [rotY, setRotY] = useState<number>(0);

  useEffect(() => {
    const unsub = ry.on("change", (v) => {
      setRotY(getHertz(v / 20000, -0.12, 0.18));
    });
    return unsub;
  }, [ry]);

  return { rotY };
};

const getHertz = (t: number, min: number, max: number) => {
  const normalizedTime = (t % 2) / 2; // Normalize time to the 0-1 range
  const oscillationValue =
    min + (max - min) * Math.sin(normalizedTime * Math.PI); // Use sin() to create the oscillation
  return oscillationValue;
};
