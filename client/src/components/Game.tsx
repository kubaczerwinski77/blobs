import { Physics } from "@react-three/cannon";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import { deg2rad, getRandomPosition } from "../utils/positioning";
import { SocketContext } from "../context/socketContext";
import Cube from "./Cube";
import Plane from "./Plane";
import Player from "./Player";

const Game = () => {
  const context = useContext(SocketContext);

  console.log(context);

  return (
    <div style={{ height: "100vh" }}>
      <Canvas style={{ background: "#FFF8EA" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <PerspectiveCamera makeDefault rotation={[deg2rad(-20), 0, 0]} />
        <Physics gravity={[0, -50, 0]} allowSleep={true}>
          <Player />
          <Plane />
          <Cube position={getRandomPosition()} />
          <Cube position={getRandomPosition()} />
          <Cube position={getRandomPosition()} />
        </Physics>
      </Canvas>
    </div>
  );
};

export default Game;
