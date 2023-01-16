import { useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React from "react";
import { RepeatWrapping } from "three";
import grass from "../assets/grass.jpeg";
import { Colors } from "../utils/colors";

const Wall = (props) => {
  const texture = useTexture(grass);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  const { height, position, rotated, length } = props;

  return (
    <RigidBody type="fixed" colliders={false}>
      <mesh
        receiveShadow
        position={[position[0], height / 2, position[1]]}
        rotation-y={rotated ? -Math.PI / 2 : 0}
      >
        <boxGeometry args={[length, height, 0.1]} />
        <meshToonMaterial color={Colors.WALL} opacity={0.5} transparent />
      </mesh>
      <CuboidCollider
        args={rotated ? [0.1, height, length] : [length, height, 0.1]}
        scale={0.5}
        position={[position[0], height / 2, position[1]]}
      />
    </RigidBody>
  );
};

export default Wall;
