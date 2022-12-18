import { PublicApi, useBox } from "@react-three/cannon";
import { Ref } from "react";
import { BufferGeometry, Material, Mesh } from "three";

const Cube: React.FC<{ position: [number, number, number] }> = ({
  position,
}) => {
  const [ref] = useBox(() => ({ mass: 1, position })) as [
    Ref<Mesh<BufferGeometry, Material>>,
    PublicApi
  ];

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="#815B5B" />
    </mesh>
  );
};

export default Cube;
