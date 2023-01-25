import { useEffect, useState } from "react";
import { ServerEvents } from "../common/events";
import { BallCollider, RigidBody } from "@react-three/rapier";
import { Sphere } from "@react-three/drei";
import { Colors } from "../utils/colors";
import _ from "lodash";

const Enemies = ({ socket, gameData }) => {
  const [otherPlayers, setOtherPlayers] = useState({});

  useEffect(() => {
    socket.on(ServerEvents.PLAYER_MOVED, (otherPlayers) => {
      setOtherPlayers(_.omit(otherPlayers, socket.id));
    });
    return () => {
      socket.off(ServerEvents.PLAYER_MOVED);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Object.values(otherPlayers).map((player) => (
        <RigidBody
          key={player.id}
          colliders={false}
          mass={10}
          type="dynamic"
          position={player.position}
          enabledRotations={[false, false, false]}
        >
          <BallCollider args={[0.3, 8, 8]} />
          <Sphere args={[0.3, 8, 8]}>
            <meshToonMaterial color={Colors.PLAYER} />
          </Sphere>
        </RigidBody>
      ))}
    </>
  );
};

export default Enemies;
