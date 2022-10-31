import Game from "./components/Game";
import SocketProvider from "./context/socketContext";

function App() {
  return (
    <SocketProvider>
      <Game />
    </SocketProvider>
  );
}

export default App;
