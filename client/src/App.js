import Game from "./components/Game";
import socketIO from "socket.io-client";
import { Menu, SERVER_URL } from "./utils/constants";
import { useEffect, useState } from "react";
import Lobby from "./components/Lobby";
import Introduce from "./components/Introduce";
import { ServerEvents } from "./common/events";

const socket = socketIO.connect(SERVER_URL);

const emitEvent = (eventName, eventPayload) => {
  socket.emit(eventName, eventPayload);
};

function App() {
  const [menuState, setMenuState] = useState(Menu.GET_USERNAME);
  const [seconds, setSeconds] = useState(2);
  const [active, setActive] = useState(false);
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    socket.on(ServerEvents.ROUND_STARTED, (data) => {
      setActive(true);
      setGameData(data);
    });
    return () => {
      socket.off(ServerEvents.ROUND_STARTED);
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    if (seconds === 0) {
      clearInterval(interval);
      setMenuState(Menu.GAME);
    }
    return () => clearInterval(interval);
  }, [active, seconds]);

  switch (menuState) {
    case Menu.GET_USERNAME:
      return <Introduce setMenuState={setMenuState} emitEvent={emitEvent} />;
    case Menu.LOBBY:
      return (
        <Lobby
          setMenuState={setMenuState}
          socket={socket}
          emitEvent={emitEvent}
          secondsLeft={seconds}
          timerActive={active}
        />
      );
    case Menu.GAME:
      return (
        <Game
          socket={socket}
          socketId={socket.id}
          emitEvent={emitEvent}
          gameData={gameData}
          setMenuState={setMenuState}
        />
      );
    default:
      return null;
  }
}

export default App;
