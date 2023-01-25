import React, { useState } from "react";
import { KeyboardControls, OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { keyMap } from "../utils/keyboard";
import Map from "./map/Map";
import { Player } from "./Player";
import Enemies from "./Enemies";
import { useEffect } from "react";
import { ClientEvents, ServerEvents } from "../common/events";
import Hud from "./Hud";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Colors } from "../utils/colors";
import { Menu } from "../utils/constants";
import _ from "lodash";

const Game = ({ socket, socketId, emitEvent, gameData, setMenuState }) => {
  const username = gameData.players[socketId]?.username;
  const startPosition = gameData.players[socketId]?.startPosition;
  const [nick, setNick] = useState("");

  useEffect(() => {
    socket.on(ServerEvents.PLAYER_WON, (player) => {
      if (_.has(player, "username")) {
        setNick(player.username);
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
                emitEvent(ClientEvents.JOIN_SERVER, username);
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
        <Sky />
        <Physics>
          {/* <Debug /> */}
          <Player
            emitEvent={emitEvent}
            socketId={socketId}
            username={username}
            startPosition={startPosition}
            socket={socket}
          />
          <Enemies socket={socket} gameData={gameData} />
          <Map emitEvent={emitEvent} />
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
};

export default Game;
