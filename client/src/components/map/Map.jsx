import React, { useMemo } from "react";
import PressurePlate from "./PressurePlate";
import Wall from "./Wall";
import Ground from "./Ground";

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

const Map = () => {
  const plates = useMemo(
    () => [
      {
        size: [1, 1],
        position: [4, -2],
        handleCollisionDetection: () => {},
      },
      {
        size: [1, 1],
        position: [-4, 2],
        handleCollisionDetection: () => {},
      },
    ],
    []
  );

  return (
    <>
      <Ground />
      {walls.map((wall) => (
        <Wall key={wall.position} {...wall} />
      ))}
      {plates.map((plate) => (
        <PressurePlate key={plate.position} {...plate} />
      ))}
    </>
  );
};

export default Map;
