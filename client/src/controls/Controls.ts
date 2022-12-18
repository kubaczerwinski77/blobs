import React from "react";

export type KeyboardControlsState<T extends string = string> = {
  [K in T]: boolean;
};

export type KeyboardControlsEntry<T extends string = string> = {
  name: T;
  keys: string[];
  up?: boolean;
};

export type KeyboardControlsProps = {
  map: KeyboardControlsEntry[];
  children: React.ReactNode;
  onChange: (
    name: string,
    pressed: boolean,
    state: KeyboardControlsState
  ) => void;
  domElement?: HTMLElement;
};

export enum Controls {
  FORWARD = "forward",
  BACKWARD = "backward",
  LEFT = "left",
  RIGHT = "right",
  JUMP = "jump",
}
