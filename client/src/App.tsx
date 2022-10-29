import GameCanvas from "./components/GameCanvas";
import SocketProvider from "./context/socketContext";

function App() {
  return (
    <SocketProvider>
      <GameCanvas />
    </SocketProvider>
  );
}

export default App;
