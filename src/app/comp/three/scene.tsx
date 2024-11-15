import { Suspense } from "react";
import { Model } from "./model";
import { Canvas } from "@react-three/fiber";
import { useGLMotion } from "./useGLMotion";

export const Scene = () => {
  const { rotY } = useGLMotion();

  return (
    <div className="relative aspect-video h-full w-full">
      <Canvas>
        <Suspense fallback="loading">
          <ambientLight intensity={1.5} />
          <spotLight position={[1, 10, 10]} angle={0.1} penumbra={1} />
          <pointLight position={[0, 10, 10]} intensity={1.5} />
          <Model
            position={[0.8, -9, -20]}
            rotation={[-1.5, rotY, 3.14]}
            // x: pitch , y: roll, z: yaw
            scale={[0.5, 0.5, 0.5]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
