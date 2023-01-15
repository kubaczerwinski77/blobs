import { PublicApi, useSphere } from "@react-three/cannon";
import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Ref } from "react";
import { BufferGeometry, Material, Mesh } from "three";

const Cube: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const [ref, api] = useSphere(() => ({ mass: 1, position })) as [
    Ref<Mesh<BufferGeometry, Material>>,
    PublicApi
  ];

  useFrame(() => {
    api.position.set(position[0], position[1], position[2]);
  });

  return <Sphere ref={ref} />;

  return (
    <mesh ref={ref}>
      <sphereGeometry />
      <meshLambertMaterial color="#815B5B" />
    </mesh>
  );
};

export default Cube;
