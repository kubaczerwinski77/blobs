import { useEffect, useState } from "react";
import { Controls } from "../controls/Controls";

const keys: Record<string, Controls> = {
  KeyW: Controls.FORWARD,
  KeyS: Controls.BACKWARD,
  KeyA: Controls.LEFT,
  KeyD: Controls.RIGHT,
  Space: Controls.JUMP,
};

const moveFieldByKey = (key: string) => keys[key];

export const usePersonControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    };
    const handleKeyUp = (e: any) => {
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};
