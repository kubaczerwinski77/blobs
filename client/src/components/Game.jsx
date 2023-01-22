import React from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import { keyMap } from "../utils/keyboard";
import Map from "./map/Map";
import { Player } from "./Player";

const Game = ({ socketId, emitEvent }) => {
  return (
    <KeyboardControls map={keyMap}>
      <Canvas
        style={{ height: "100vh" }}
        camera={{ fov: 90, position: [0, 5, 5] }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight castShadow intensity={0.8} position={[10, 10, 10]} />
        <OrbitControls />
        <Physics>
          <Debug />
          <Player emitEvent={emitEvent} socketId={socketId} />
          <Map />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
};

export default Game;
