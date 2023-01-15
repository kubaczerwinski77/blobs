import { createContext, ReactNode, useEffect, useState } from "react";
import io from "socket.io-client";
import { ISocketType } from "../@types/socket";
import { SocketEvents } from "../utils/events";

export const SocketContext = createContext<ISocketType | null>(null);

const socket = io("http://localhost:3001");

interface IProps {
  children: ReactNode;
}

const SocketProvider: React.FC<IProps> = ({ children }) => {
  const [connected, setConnected] = useState(socket.connected);
  const [players, setPlayers] = useState({});

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    socket.on(SocketEvents.PLAYER_JOINED, (payload) => {
      setPlayers(payload.players);
    });
    socket.on("players_changed", (payload) => {
      console.log("payload", payload);
      setPlayers(payload.players);
    });
  }, [players]);

  const emitEvent = (event: string, payload: unknown) => {
    socket.emit(event, payload);
  };

  return (
    <SocketContext.Provider
      value={{ id: socket.id, connected, emitEvent, players }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
