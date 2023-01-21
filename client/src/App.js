import Game from "./components/Game";
import socketIO from "socket.io-client";
import { SERVER_URL } from "./utils/constants";

const socket = socketIO.connect(SERVER_URL);

function App() {
  return <Game socket={socket} />;
}

export default App;
