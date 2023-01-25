import React, { useMemo } from "react";
import PressurePlate from "./PressurePlate";
import Wall from "./Wall";
import Ground from "./Ground";
import { ClientEvents } from "../../common/events";
import Fence from "../obstacles/Fence";

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
    position: [0, 1.5],
  },
  {
    height: 1,
    length: 3,
    rotated: true,
    position: [2.5, -1.5],
  },
  {
    height: 1,
    length: 3,
    rotated: true,
    position: [-2.5, -1.5],
  },
];

const fences = [
  {
    height: 0.4,
    length: 2.5,
    rotated: false,
    position: [-1.25, 0],
  },
  {
    height: 1,
    length: 1,
    rotated: true,
    position: [0, -1.5],
  },
  {
    height: 0.9,
    length: 0.75,
    rotated: false,
    position: [0.375, 0],
  },
  {
    height: 0.9,
    length: 0.75,
    rotated: false,
    position: [2.125, 0],
  },
];

const Map = ({ emitEvent }) => {
  const plates = useMemo(
    () => [
      {
        size: [1, 1],
        position: [4, -2],
        handleCollisionDetection: (data) => {
          emitEvent(ClientEvents.WIN, data.rigidBodyObject.name);
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Ground />
      {walls.map((wall) => (
        <Wall key={wall.position} {...wall} />
      ))}
      {fences.map((fence) => (
        <Fence key={fence.position} {...fence} />
      ))}
      {plates.map((plate) => (
        <PressurePlate key={plate.position} {...plate} />
      ))}
    </>
  );
};

export default Map;
