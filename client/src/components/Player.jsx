import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useEffect, useRef, useState } from "react";
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
import { ClientEvents, ServerEvents } from "../common/events";

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export const Player = ({ socket, emitEvent, socketId, username }) => {
  const ref = useRef();
  const name = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  const [winner, setWinner] = useState();
  const winnerRef = useRef();

  useEffect(() => {
    socket.on(ServerEvents.PLAYER_WON, (player) => {
      if (!winnerRef.current) {
        winnerRef.current = player?.username;
        setWinner(winnerRef);
      }
    });
    return () => {
      socket.off(ServerEvents.PLAYER_WON);
    };
  }, [socket]);

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();
    const velocity = ref.current.linvel();

    // track player movement
    const pos = ref.current.translation();
    state.camera.lookAt(pos);
    name.current.position.copy(pos);
    name.current.rotation.copy(state.camera.rotation);

    // emit move event
    emitEvent(ClientEvents.SET_MOVE, pos);

    if (!winner) {
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
    }
  });

  return (
    <group>
      <RigidBody
        ref={ref}
        colliders={false}
        mass={10}
        type="dynamic"
        position={[-4, 2, 2]}
        enabledRotations={[false, false, false]}
        name={socketId}
      >
        <BallCollider args={[0.3, 8, 8]} />
        <Sphere args={[0.3, 8, 8]}>
          <meshToonMaterial color={Colors.PLAYER} />
        </Sphere>
      </RigidBody>
      <Billboard ref={name}>
        <Text color={"#555"} scale={0.3} position={[0, 0.4, 0]}>
          {username}
        </Text>
      </Billboard>
    </group>
  );
};
