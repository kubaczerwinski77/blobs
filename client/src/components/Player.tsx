import { PublicApi, useBox } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Ref, useEffect, useMemo, useRef } from "react";
import { BufferGeometry, Material, Mesh, Vector3 } from "three";
import { usePersonControls } from "../hooks/use-person-controls";
import { cameraOffset, JUMP_HEIGHT, SPEED } from "../utils/constants";

const Player = () => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 3, 0] })) as [
    Ref<Mesh<BufferGeometry, Material>>,
    PublicApi
  ];

  const { camera } = useThree();
  const { forward, backward, left, right, jump } = usePersonControls();

  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);

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
    const unsubscribe = api.position.subscribe((v) => (position.current = v));
    return unsubscribe;
  }, [api.position]);

  useFrame(() => {
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (jump) {
      api.velocity.set(velocity.current[0], JUMP_HEIGHT, velocity.current[2]);
    }

    camera.position
      .set(position.current[0], 0, position.current[2])
      .add(cameraOffset);
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="#815B5B" />
    </mesh>
  );
};

export default Player;
