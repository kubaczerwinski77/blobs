import { createContext, ReactNode, useEffect, useState } from "react";
import * as io from "socket.io-client";
import { ISocketType } from "../@types/socket";

export const SocketContext = createContext<ISocketType | null>(null);

const socket = io.connect("http://localhost:3001");

interface IProps {
  children: ReactNode;
}

const SocketProvider: React.FC<IProps> = ({ children }) => {
  const [connected, setConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState<string | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };

  return (
    <SocketContext.Provider value={{ socket, connected, lastPong, sendPing }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
