// import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Model } from "./model";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";

export const JunoCraft = () => {
  return (
    <div className="h-full w-full">
      <Canvas>
        <Suspense fallback="loading">
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-5, -10, -10]} />
          <Model position={[2, 0, 8]} scale={[1, 1, 1]} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

/*



import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/juno.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['black_krinkle_Geometry-Body007'].geometry}
        material={materials.black_krinkle}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['dish_bottom_Geometry-Mesh'].geometry}
        material={materials.foil_silver}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['dish_top_2_Geometry-Mesh003'].geometry}
        material={materials['new']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['dish_top_Geometry-Mesh002'].geometry}
        material={materials.foil_ant}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['gold_foil_Geometry-Body004'].geometry}
        material={materials.foil_gold}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['shiny_panels_Geometry-Body021'].geometry}
        material={materials.shiny_panels}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['silver_foil_Geometry-Body002'].geometry}
        material={materials.foil_silver}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['solar_panels_Geometry-Body006'].geometry}
        material={materials.solar_panels}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['tex_01_A_Geometry-Body009'].geometry}
        material={materials.tex_01_A}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['tex_01_Geometry-Body003'].geometry}
        material={materials.tex_01}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/juno.glb')
*/
