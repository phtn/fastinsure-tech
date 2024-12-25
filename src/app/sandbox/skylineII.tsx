"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { type Group } from "three";

const ToweringCubes = () => {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (group) {
      group.position.z = (clock.getElapsedTime() * +1.5) % 500; // Simulate forward motion
    }
  });

  const createBuildings = (side: "left" | "right") => {
    const buildings = [];
    const offsetX = side === "left" ? -80 : 30;

    const fib: number[] = [1, 1, 2, 3, 5, 8, 13, 25, 38, 63];

    for (let i = 0; i < 5000; i++) {
      const variable = Math.ceil(Math.random() * 10) - 1;
      const z = -(i * 15); // Place cubes along the Z-axis
      const height = Math.random() * 42 + (fib[variable ?? 0] ?? 24); // Vary the height of cubes

      buildings.push(
        <mesh
          position={[offsetX, height / 2, z + z * 0.42]}
          key={`${side}-${i}`}
        >
          <boxGeometry args={[20, (height * height) / 10, 15]} />
          <meshBasicMaterial color="black" transparent opacity={0.0} />
          <Edges
            color={
              i % 7 === 0 ? "#14141b" : i % 8 === 0 ? "cyan" : "papayawhip"
            }
          />
        </mesh>,
      );
    }
    return buildings;
  };

  return (
    <group ref={groupRef}>
      {createBuildings("left")}
      {createBuildings("right")}
    </group>
  );
};

const SkylineEffect = () => {
  return (
    <Canvas
      camera={{
        position: [0, 15, 10], // Camera slightly above ground level
        fov: 100, // Wider field of view for dramatic effect
        near: 0.1,
        far: 1000,
      }}
    >
      <ambientLight intensity={0.2} />
      <ToweringCubes />
    </Canvas>
  );
};

export default function SkylineII() {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#9ca3af" }}>
      <SkylineEffect />
    </div>
  );
}
