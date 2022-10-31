import { PublicApi, useBox } from "@react-three/cannon";
import { Ref } from "react";
import { BufferGeometry, Material, Mesh } from "three";

const Cube = () => {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 3, 0] })) as [
    Ref<Mesh<BufferGeometry, Material>>,
    PublicApi
  ];

  const handleCubeClick = () => {
    api.velocity.set(0, 5, 0);
  };

  return (
    <mesh ref={ref} onClick={handleCubeClick}>
      <boxGeometry />
      <meshLambertMaterial color="#815B5B" />
    </mesh>
  );
};

export default Cube;
