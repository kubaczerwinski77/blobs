import { Vector3 } from "three";

export const enum Positioning {
  MIN_X = -4,
  MAX_X = 4,
  MIN_Y = 5,
  MAX_Y = 5,
  MIN_Z = -4,
  MAX_Z = 4,
}

export const SPEED = 5;
export const JUMP_HEIGHT = 5;
export const POSITION_OFFSET = 0.01;
export const cameraOffset = new Vector3(0, 5, 10);
