import React, { useState } from "react";
import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Menu } from "../utils/constants";
import NICKNAMES from "../utils/nicknames";
import { ClientEvents } from "../common/events";

const Introduce = ({ setMenuState, emitEvent }) => {
  const [username, setUsername] = useState("");

  const handleRandomizeNickname = () => {
    setUsername(NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)]);
  };

  const handleLobbyClick = () => {
    emitEvent(ClientEvents.JOIN_SERVER, username);
    setMenuState(Menu.LOBBY);
  };

  return (
    <Flex
      justify="center"
      align="center"
      h="100vh"
      direction="column"
      gap="10px"
    >
      <Heading>Welcome to blobs game!</Heading>
      <Text w="400px" textAlign="center">
        Introduce yourself to other players 🙏🏼 choose a nickname or go nutty
        and&nbsp;
        <Button
          variant="link"
          colorScheme="teal"
          onClick={handleRandomizeNickname}
        >
          randomize it
        </Button>
        &nbsp;🎲
      </Text>
      <Input
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        width="300px"
      />
      <Button
        colorScheme="teal"
        isDisabled={username === ""}
        onClick={handleLobbyClick}
      >
        Join lobby
      </Button>
    </Flex>
  );
};

export default Introduce;
