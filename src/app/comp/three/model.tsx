import { useGLTF } from "@react-three/drei";
import { type GLTF } from "three-stdlib";
import type {
  EulerOrder,
  Group,
  Material,
  Mesh,
  Object3DEventMap,
} from "three";
import type { Euler, ReactProps, Vector3 } from "@react-three/fiber";
import { memo, useCallback } from "react";

type GLTFResult = GLTF & {
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};

const shuttle = "/threed/space_shuttle.glb";

const ModelComponent = (
  props: ReactProps<Group<Object3DEventMap>> & {
    position: (number | Vector3 | [x: number, y: number, z: number]) & Vector3;
  } & {
    rotation: (
      | number
      | Euler
      | [x: number, y: number, z: number, order?: EulerOrder | undefined]
    ) &
      Euler;
  } & {
    scale: (number | Vector3 | [x: number, y: number, z: number]) & Vector3;
  },
) => {
  const { nodes, materials } = useGLTF(shuttle) as GLTFResult;

  const Nodes = useCallback(
    () =>
      Object.keys(nodes).map((key) => (
        <mesh
          key={key}
          castShadow
          receiveShadow
          geometry={nodes[key]?.geometry}
          material={materials[key] ?? nodes[key]?.material}
        />
      )),
    [materials, nodes],
  );

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube?.geometry}
        material={materials.Material}
      />
      <Nodes />
    </group>
  );
};
export const Model = memo(ModelComponent);
useGLTF.preload(shuttle);
