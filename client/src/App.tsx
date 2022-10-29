import "./App.css";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const handleSendMessage = () => {
    // socket.emit("");
  };

  return (
    <div className="App">
      <input placeholder="Message..." />
      <button onClick={handleSendMessage}>Send message</button>
    </div>
  );
}

export default App;
