import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import React from "react";
import { keyMap } from "../utils/keyboard";
import Ground from "./Ground";
import { Player } from "./Player";
import PressurePlate from "./PressurePlate";
import Wall from "./Wall";

const walls = [
  {
    height: 1,
    length: 10,
    rotated: false,
    position: [0, -3],
  },
  {
    height: 1,
    length: 10,
    rotated: false,
    position: [0, 3],
  },
  {
    height: 1,
    length: 6,
    rotated: true,
    position: [5, 0],
  },
  {
    height: 1,
    length: 6,
    rotated: true,
    position: [-5, 0],
  },
  {
    height: 1,
    length: 3,
    rotated: true,
    position: [0, -1.5],
  },
  {
    height: 1,
    length: 3,
    rotated: true,
    position: [2.5, 1.5],
  },
  {
    height: 1,
    length: 3,
    rotated: true,
    position: [-2.5, 1.5],
  },
];

const plates = [
  {
    size: [1, 1],
    position: [4, -2],
    handleCollisionDetection: () => console.log("RACE ENDED"),
  },
  {
    size: [1, 1],
    position: [-4, 2],
    handleCollisionDetection: () => console.log("RACE STARTED"),
  },
];

const Game = () => {
  return (
    <KeyboardControls map={keyMap}>
      <Canvas
        style={{ height: "100vh" }}
        camera={{ fov: 90, position: [0, 5, 5] }}
      >
        {/* <Sky sunPosition={sunPosition} /> */}
        <ambientLight intensity={0.3} />
        <directionalLight castShadow intensity={0.8} position={[10, 10, 10]} />
        <OrbitControls />
        <Physics>
          <Debug />
          <Ground />
          <Player />
          {walls.map((wall) => (
            <Wall key={wall.position} {...wall} />
          ))}
          {plates.map((plate) => (
            <PressurePlate key={plate.position} {...plate} />
          ))}
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
};

export default Game;
