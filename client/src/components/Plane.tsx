import { usePlane } from "@react-three/cannon";
import { Ref } from "react";
import { Mesh } from "three";

const Plane = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  })) as Array<Ref<Mesh>>;

  return (
    <mesh ref={ref}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial color="#9E7676" />
    </mesh>
  );
};

export default Plane;
