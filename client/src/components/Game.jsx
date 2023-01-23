import React, { useRef, useState } from "react";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Debug, Physics } from "@react-three/rapier";
import { keyMap } from "../utils/keyboard";
import Map from "./map/Map";
import { Player } from "./Player";
import Enemies from "./Enemies";
import { useEffect } from "react";
import { ServerEvents } from "../common/events";
import Hud from "./Hud";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Colors } from "../utils/colors";
import { Menu } from "../utils/constants";

const Game = ({ socket, socketId, emitEvent, gameData, setMenuState }) => {
  const winner = useRef(null);
  const username = gameData.players[socketId]?.username;
  const [nick, setNick] = useState("");

  useEffect(() => {
    socket.on(ServerEvents.PLAYER_WON, (player) => {
      if (!winner.current) {
        winner.current = player.username;
        setNick(winner.current);
        console.log("WINNER", player.username);
      }
    });
    return () => {
      socket.off(ServerEvents.PLAYER_WON);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardControls map={keyMap}>
      {nick && (
        <Hud>
          <VStack>
            <Box bg="teal.400" p={2} borderRadius={10}>
              <Heading size={"2xl"} color={Colors.PLAYER}>
                {nick} won! 🥇
              </Heading>
            </Box>
            <Button
              colorScheme="gray"
              size="sm"
              rightIcon={<RepeatIcon />}
              onClick={() => {
                setMenuState(Menu.LOBBY);
              }}
            >
              Play again
            </Button>
          </VStack>
        </Hud>
      )}
      <Canvas
        style={{ height: "100vh" }}
        camera={{ fov: 90, position: [0, 5, 5] }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight castShadow intensity={0.8} position={[10, 10, 10]} />
        <OrbitControls />
        <Physics>
          <Debug />
          <Player
            emitEvent={emitEvent}
            socketId={socketId}
            username={username}
            socket={socket}
          />
          <Enemies socket={socket} />
          <Map emitEvent={emitEvent} />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
};

export default Game;
