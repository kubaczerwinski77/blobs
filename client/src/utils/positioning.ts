import { Positioning } from "./constants";

export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getRandomPosition = (): [number, number, number] => {
  return [
    getRandomArbitrary(Positioning.MIN_X, Positioning.MAX_X),
    getRandomArbitrary(Positioning.MIN_Y, Positioning.MAX_Y),
    getRandomArbitrary(Positioning.MIN_Z, Positioning.MAX_Z),
  ];
};

export const deg2rad = (degrees: number) => degrees * (Math.PI / 180);
