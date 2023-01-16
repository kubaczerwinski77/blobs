import { useTexture } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React from "react";
import { RepeatWrapping } from "three";
import grass from "../assets/grass.jpeg";
import { Colors } from "../utils/colors";

const Ground = (props) => {
  const texture = useTexture(grass);
  texture.wrapS = texture.wrapT = RepeatWrapping;

  return (
    <RigidBody {...props} type="fixed" colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10, 6]} />
        <meshToonMaterial color={Colors.GROUND} />
      </mesh>
      <CuboidCollider args={[10, 0, 6]} scale={0.5} position={[0, 0, 0]} />
    </RigidBody>
  );
};

export default Ground;
