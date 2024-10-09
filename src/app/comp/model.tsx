import { useGLTF } from "@react-three/drei";
import { type GLTF } from "three-stdlib";
import type { Material, Mesh } from "three";

type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};

const messenger = "/threed/messenger.glb";

export const Model = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF(messenger) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube?.geometry}
        material={materials.Material}
      />
      {Object.keys(nodes).map((key) => (
        <mesh
          key={key}
          castShadow
          receiveShadow
          geometry={nodes[key]?.geometry}
          material={materials[key] ?? nodes[key]?.material}
        />
      ))}
    </group>
  );
};
useGLTF.preload(messenger);
