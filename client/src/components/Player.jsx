import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Billboard,
  Sphere,
  Text,
  useKeyboardControls,
} from "@react-three/drei";
import { BallCollider, RigidBody, useRapier } from "@react-three/rapier";
import { Colors } from "../utils/colors";
import { PlayerData } from "../utils/constants";
import { ClientEvents } from "../common/events";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = ({ socket, seconds }) => {
  const ref = useRef();
  const name = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();
    const velocity = ref.current.linvel();

    // track player movement
    const pos = ref.current.translation();
    state.camera.lookAt(pos);
    name.current.position.copy(pos);
    name.current.rotation.copy(state.camera.rotation);

    // emit move event
    socket.emit(ClientEvents.SET_MOVE, {
      id: socket.id,
      pos,
    });

    // move player object
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(PlayerData.SPEED)
      .applyEuler(state.camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z });

    // jumping
    const world = rapier.world.raw();
    const ray = world.castRay(
      new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 })
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 0.3;
    if (jump && grounded)
      ref.current.setLinvel({ x: direction.x, y: 3, z: direction.z });
  });

  return (
    <group>
      <RigidBody
        ref={ref}
        colliders={false}
        mass={10}
        type="dynamic"
        position={[-4, 2, 2]}
        enabledRotations={[true, true, true]}
      >
        <BallCollider args={[0.3, 8, 8]} />
        <Sphere args={[0.3, 8, 8]}>
          <meshToonMaterial color={Colors.PLAYER} />
        </Sphere>
      </RigidBody>
      <Billboard ref={name}>
        <Text color={Colors.PLAYER} scale={0.2} position={[0, 0.4, 0]}>
          {`Your time: ${seconds}`}
        </Text>
      </Billboard>
    </group>
  );
};
