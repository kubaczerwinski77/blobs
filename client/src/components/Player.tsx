import { PublicApi, Triplet, useBox, useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Ref, useContext, useEffect, useMemo, useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { SocketContext } from "../context/socketContext";
import { usePersonControls } from "../hooks/use-person-controls";
import { cameraOffset, JUMP_HEIGHT, SPEED } from "../utils/constants";
import { detectChange, getRandomPosition } from "../utils/positioning";

const Player = () => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: getRandomPosition(),
  })) as [Ref<Mesh<BufferGeometry, Material>>, PublicApi];

  const socket = useContext(SocketContext);

  const { camera } = useThree();
  const { forward, backward, left, right, jump } = usePersonControls();

  const velocity = useRef<Triplet>([0, 0, 0]);
  const position = useRef<Triplet>([0, 0, 0]);

  const direction = useMemo(() => {
    let frontVector = new Vector3(0, 0, 0);
    let sideVector = new Vector3(0, 0, 0);
    let direction = new Vector3(0, 0, 0);

    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED);

    return direction;
  }, [forward, backward, right, left]);

  useEffect(() => {
    const unsubscribe = api.velocity.subscribe((v) => (velocity.current = v));
    return unsubscribe;
  }, [api.velocity]);

  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => {
      if (detectChange(position.current, v)) {
        const eventPayload = {
          id: socket?.id,
          pos: v,
        };
        socket?.emitEvent("position_change", eventPayload);
      }
      return (position.current = v);
    });
    return unsubscribe;
  }, [api.position, socket?.id, socket]);

  useFrame(() => {
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump) {
      api.velocity.set(velocity.current[0], JUMP_HEIGHT, velocity.current[2]);
    }

    camera.position
      .set(position.current[0], 0, position.current[2])
      .add(cameraOffset);
  });

  return <Sphere ref={ref} args={[0.5, 1]} />;

  return (
    <mesh ref={ref}>
      <sphereGeometry />
      <meshLambertMaterial color="#815B5B" />
    </mesh>
  );
};

export default Player;
