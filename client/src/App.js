import Game from "./components/Game";
import socketIO from "socket.io-client";
import { Menu, SERVER_URL } from "./utils/constants";
import { useState } from "react";
import Lobby from "./components/Lobby";
import Introduce from "./components/Introduce";

const socket = socketIO.connect(SERVER_URL);

const emitEvent = (eventName, eventPayload) => {
  socket.emit(eventName, eventPayload);
};

function App() {
  const [menuState, setMenuState] = useState(Menu.GET_USERNAME);

  switch (menuState) {
    case Menu.GET_USERNAME:
      return <Introduce setMenuState={setMenuState} emitEvent={emitEvent} />;
    case Menu.LOBBY:
      return (
        <Lobby
          setMenuState={setMenuState}
          socket={socket}
          emitEvent={emitEvent}
        />
      );
    case Menu.GAME:
      return <Game socket={socket} />;
    default:
      return <div>default</div>;
  }
}

export default App;
