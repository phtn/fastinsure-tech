"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { type Group } from "three";

const MovingCubes = () => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (group) {
      group.position.z = (clock.getElapsedTime() * -10) % 50; // Simulate forward movement
    }
  });

  const createCubes = () => {
    const cubes = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 20 - 10;
      const z = -(i * 5);
      const y = Math.random() * 10 - 5;

      cubes.push(
        <mesh position={[x, y, z]} key={i}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial color="black" transparent opacity={0} />
          <Edges color="white" /> {/* Render only edges */}
        </mesh>,
      );
    }
    return cubes;
  };

  return <group ref={groupRef}>{createCubes()}</group>;
};

const SkylineEffect = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
        fov: 90,
        near: 0.1,
        far: 1000,
      }}
    >
      <ambientLight intensity={0.5} />
      <MovingCubes />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
};

export default function Skyline() {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <SkylineEffect />
    </div>
  );
}
