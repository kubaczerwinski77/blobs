import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ClientEvents, ServerEvents } from "../common/events";
import { PLAYERS_REQUIRED } from "../utils/constants";

const Lobby = ({ secondsLeft, timerActive, socket, emitEvent }) => {
  const [players, setPlayers] = useState({});
  const waitingForPlayers = Object.keys(players).length < PLAYERS_REQUIRED;
  const isHost = players[socket.id]?.host;

  const handleStartGame = () => {
    emitEvent(ClientEvents.START_GAME);
  };

  console.log("players", players);

  useEffect(() => {
    socket.on(ServerEvents.PLAYER_JOINED, (data) => {
      setPlayers(data);
    });
    socket.on(ServerEvents.PLAYER_LEFT, (data) => {
      setPlayers(data);
    });
    return () => {
      socket.off(ServerEvents.PLAYER_JOINED);
      socket.off(ServerEvents.PLAYER_LEFT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      h="100vh"
      gap="10px"
    >
      <Flex align="center" gap="8px">
        <Text>
          {waitingForPlayers
            ? "Waiting for other players to join"
            : "Players who joined the lobby 🎮"}
        </Text>
        {waitingForPlayers && <Spinner size="sm" />}
      </Flex>
      {Object.entries(players).map(([id, player]) => (
        <Text key={id} as={id === socket.id && "b"}>{`- ${player.username} ${
          player.host ? "👑" : "👨🏼‍💻"
        }`}</Text>
      ))}
      {timerActive ? (
        <Text>Get ready! The game starts in {secondsLeft} seconds ⏱️</Text>
      ) : (
        <Button
          onClick={handleStartGame}
          colorScheme="teal"
          isDisabled={!isHost || waitingForPlayers}
          variant="ghost"
          size="sm"
        >
          Start game
        </Button>
      )}
    </Flex>
  );
};

export default Lobby;
