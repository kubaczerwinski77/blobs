import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React from "react";
import { Colors } from "../../utils/colors";

const PressurePlate = (props) => {
  const { position, size, handleCollisionDetection } = props;

  return (
    <RigidBody
      type="fixed"
      colliders={false}
      onCollisionEnter={handleCollisionDetection}
    >
      <mesh
        receiveShadow
        position={[position[0], 0.01, position[1]]}
        rotation-x={-Math.PI / 2}
      >
        <planeGeometry args={size} />
        <meshToonMaterial color={Colors.OBSTACLE} />
      </mesh>
      <CuboidCollider
        args={[size[0], 0.01, size[1]]}
        scale={0.5}
        position={[position[0], 0.01, position[1]]}
      />
    </RigidBody>
  );
};

export default PressurePlate;
