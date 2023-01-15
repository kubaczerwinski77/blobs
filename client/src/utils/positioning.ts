import { Positioning, POSITION_OFFSET } from "./constants";

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

export const detectChange = (
  prev: [number, number, number],
  next: [number, number, number]
) => {
  let shouldChange = false;
  if (Math.abs(prev[0] - next[0]) > POSITION_OFFSET) {
    shouldChange = true;
  }
  if (Math.abs(prev[1] - next[1]) > POSITION_OFFSET) {
    shouldChange = true;
  }
  if (Math.abs(prev[2] - next[2]) > POSITION_OFFSET) {
    shouldChange = true;
  }
  return shouldChange;
};
