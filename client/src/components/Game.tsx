import { Physics } from "@react-three/cannon";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import Plane from "./Plane";

const Game = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas style={{ background: "#FFF8EA" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        <OrbitControls />
        <Physics>
          <Cube />
          <Plane />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Game;
